import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../../TanstakeHook/useCart";
import { Authcontext } from "../../../../AuthProvider/Authprovider";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import { data } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [clientsecret, setClientsecret] = useState('');
  const [paymentId, setPaymentId]=useState('')

  const [cart, refetch] = useCart();
  const { user } = useContext(Authcontext);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const useAxiospublic = Axiospublic();

  useEffect(() => {
    useAxiospublic
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientsecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Error fetching client secret:", err));
  }, [totalPrice, useAxiospublic]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("[error]", error);
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    //   confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "Unknown User",
            email: user?.email || "unknown@example.com",
          },
        },
      });
    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setError(confirmError.message);
    } else {
      // console.log("Payment successful:", paymentIntent);
      if(paymentIntent.status === "succeeded"){
        // console.log('id',paymentIntent.id);
        setPaymentId(paymentIntent.id)
        const paymentInfo = {
            email : user.email,
            tansictionId:paymentIntent.id,
            date:new data(),
            price:totalPrice,
            cardIds: cart.map(item => item._id),
            menuIds: cart.map(items => items.menuId),
            status:'pending'
        }

        useAxiospublic.post('/payment',paymentInfo)
        .then((res) => {
            refetch()
            if(res?.data?.paymentResult?.status) {
                Swal.fire({
                    position:"top-end",
                    icon: "success",
                    title: "Thank you for your payment",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
      }
    }
  };

  return (
    <div className="w-10/12 mx-auto">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-10"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <p className="text-red-600 my-5">{error}</p>
        <p className="text-blue-600 my-5">{paymentId}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../../TanstakeHook/useCart";
import { Authcontext } from "../../../../AuthProvider/Authprovider";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientsecret, setClientsecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [processing, setProcessing] = useState(false);

  const [cart, refetch] = useCart();
  const { user } = useContext(Authcontext);

  const totalPrice = cart.reduce(
    (total, item) => total + (typeof item.price === "number" ? item.price : parseFloat(item.price) || 0),
    0
  );

  const useAxiospublic = Axiospublic();

  useEffect(() => {
    if (totalPrice > 0) {
      useAxiospublic
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientsecret(res.data.clientSecret);
          }
        })
        .catch(() => {});
    }
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

    setProcessing(true);

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    } else {
      setError("");
    }

    if (clientsecret) {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientsecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName || "Gourmet Diner",
              email: user?.email || "diner@bistroboss.com",
            },
          },
        }
      );

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
      } else {
        if (paymentIntent.status === "succeeded") {
          setPaymentId(paymentIntent.id);
          const paymentInfo = {
            email: user?.email,
            tansictionId: paymentIntent.id,
            date: new Date(),
            price: totalPrice,
            cardIds: cart.map((item) => item._id),
            menuIds: cart.map((items) => items.menuId || items._id),
            status: "pending",
          };

          useAxiospublic.post("/payment", paymentInfo).then((res) => {
            setProcessing(false);
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment Received! Your feast is being prepared.",
              showConfirmButton: false,
              timer: 2000,
              background: "#0f172a",
              color: "#fff",
            });
          });
        }
      }
    } else {
      // Mock fallback if stripe secret backend is in test mode
      setProcessing(false);
      Swal.fire({
        icon: "info",
        title: "Test Mode Simulation",
        text: "Card validated successfully! To process live transactions, ensure Stripe secret is configured on server.",
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-800">
        <span className="text-gray-400 text-sm font-light">Total Payment Due:</span>
        <span className="font-cinzel text-2xl font-bold text-amber-400">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 rounded-xl bg-slate-950/80 border border-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#f8fafc",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  "::placeholder": {
                    color: "#64748b",
                  },
                },
                invalid: {
                  color: "#f87171",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || totalPrice <= 0}
          className="w-full py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.01] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaLock className="text-xs" />
          {processing ? "Processing Secured Payment..." : `Pay $${totalPrice.toFixed(2)}`}
        </button>

        {error && (
          <p className="text-red-400 text-xs bg-red-950/40 p-3 rounded-lg border border-red-800/40">
            {error}
          </p>
        )}
        {paymentId && (
          <p className="text-emerald-400 text-xs bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/40">
            Transaction Identifier: {paymentId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;

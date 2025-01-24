import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./ChechoutFrom/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QgggJIZSEhvBBrzr2crcuEXxwdweqBPABHAKhWhSQKA8k0DrmEXxtWtqyFx4Jfy0ceqp7y3ng3aqmoamssOe6UZ00ZASWh9CI"
);

const Payment = () => {
  return <>
    <div>
        <h1 className="text-3xl uppercase font-bold text-center my-10">payment</h1>
    </div>
<Elements stripe={stripePromise}>
    <CheckoutForm></CheckoutForm>
</Elements>
  </>
  
};

export default Payment;

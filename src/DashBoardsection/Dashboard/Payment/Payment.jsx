import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./ChechoutFrom/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import Sheared from "../../../ShearedSEction/Sheared";

const stripePromise = loadStripe(
  "pk_test_51QgggJIZSEhvBBrzr2crcuEXxwdweqBPABHAKhWhSQKA8k0DrmEXxtWtqyFx4Jfy0ceqp7y3ng3aqmoamssOe6UZ00ZASWh9CI"
);

const Payment = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Sheared Subtitle="Secured Transaction" title="RESTAURANT PAYMENT" />

      <div className="rounded-3xl bg-slate-900/90 border border-amber-500/30 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./ChechoutFrom/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import Sheared from "../../../ShearedSEction/Sheared";
import { FaLock, FaShieldAlt } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51QgggJIZSEhvBBrzr2crcuEXxwdweqBPABHAKhWhSQKA8k0DrmEXxtWtqyFx4Jfy0ceqp7y3ng3aqmoamssOe6UZ00ZASWh9CI"
);

const Payment = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Sheared Subtitle="Bank-Grade 256-bit Encrypted Checkout" title="SECURE CHECKOUT & PAYMENT" />

      {/* Trust Guarantee Top Banner */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-wrap items-center justify-center gap-6 p-4 rounded-2xl bg-slate-900/80 border border-amber-500/20 text-xs text-gray-300">
        <span className="flex items-center gap-2 text-amber-400 font-semibold">
          <FaLock className="text-xs" /> 256-Bit SSL Encrypted
        </span>
        <span className="hidden sm:inline text-gray-700">•</span>
        <span className="flex items-center gap-2 text-amber-400 font-semibold">
          <FaShieldAlt className="text-xs" /> PCI-DSS Level 1 Certified
        </span>
        <span className="hidden sm:inline text-gray-700">•</span>
        <span className="text-gray-300">
          Stripe Verified Merchant Partner
        </span>
      </div>

      <div className="w-full">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

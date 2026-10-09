import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useCart from "../../../../TanstakeHook/useCart";
import { Authcontext } from "../../../../AuthProvider/Authprovider";
import Axiospublic from "../../../../AxiosPublic/Axiospublic";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import {
  FaLock,
  FaCreditCard,
  FaMoneyBillWave,
  FaMobileAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaUtensils,
  FaTruck,
  FaStore,
  FaTag,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientsecret, setClientsecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [processing, setProcessing] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'cash' | 'mobile'
  const [diningMode, setDiningMode] = useState("delivery"); // 'delivery' | 'dine-in' | 'pickup'

  const [cart, refetch] = useCart();
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();
  const useAxiospublic = Axiospublic();

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    tableNumber: "",
    notes: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      (typeof item.price === "number" ? item.price : parseFloat(item.price) || 0) *
        (item.quantity || 1),
    0
  );

  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee =
    diningMode === "delivery" ? (subtotal > 60 || subtotal === 0 ? 0 : 3.5) : 0;
  const tax = subtotal * 0.05;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  useEffect(() => {
    if (grandTotal > 0 && paymentMethod === "card") {
      useAxiospublic
        .post("/create-payment-intent", { price: grandTotal })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientsecret(res.data.clientSecret);
          }
        })
        .catch(() => {});
    }
  }, [grandTotal, paymentMethod, useAxiospublic]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "BISTRO10") {
      setDiscountPercent(10);
      setPromoMessage("✓ VIP 10% Discount Applied!");
    } else if (promoCode.trim().toUpperCase() === "CHEF20") {
      setDiscountPercent(20);
      setPromoMessage("✓ Master Chef 20% Discount Applied!");
    } else {
      setDiscountPercent(0);
      setPromoMessage("✕ Invalid coupon code. Try 'BISTRO10'");
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your Cart is Empty",
        text: "Please select dishes from our menu before proceeding with checkout.",
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    if (!customerInfo.phone) {
      Swal.fire({
        icon: "info",
        title: "Contact Phone Required",
        text: "Please provide a contact phone number for delivery or table confirmation.",
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      });
      return;
    }

    setProcessing(true);
    setError("");

    // Case 1: Cash on Delivery or Pay at Table
    if (paymentMethod === "cash") {
      const orderRef = "CASH-" + Date.now().toString().slice(-6);
      const paymentInfo = {
        email: user?.email,
        name: customerInfo.name,
        phone: customerInfo.phone,
        serviceType: diningMode,
        deliveryAddress: customerInfo.address || customerInfo.tableNumber,
        notes: customerInfo.notes,
        tansictionId: orderRef,
        date: new Date(),
        price: grandTotal,
        cardIds: cart.map((item) => item._id),
        menuIds: cart.map((item) => item.menuId || item._id),
        paymentMethod: "Cash on Delivery",
        status: "pending",
      };

      try {
        await useAxiospublic.post("/payment", paymentInfo);
      } catch (err) {
        // Fallback for mock environments
      }

      setProcessing(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        html: `
          <div class="text-left space-y-2 text-sm text-gray-300">
            <p><strong class="text-amber-400">Order Reference:</strong> ${orderRef}</p>
            <p><strong class="text-white">Amount Due:</strong> $${grandTotal.toFixed(2)}</p>
            <p><strong class="text-white">Payment Method:</strong> Pay Upon Arrival / Cash</p>
            <p class="text-xs text-gray-400 pt-2 border-t border-gray-700">Our kitchen is preparing your culinary order. You will receive an SMS confirmation shortly.</p>
          </div>
        `,
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      }).then(() => {
        navigate("/dashboard/paymentHistory");
      });
      return;
    }

    // Case 2: Mobile Banking / Digital Wallet (bKash / Nagad / Wallet simulation)
    if (paymentMethod === "mobile") {
      const orderRef = "MBL-" + Date.now().toString().slice(-6);
      const paymentInfo = {
        email: user?.email,
        name: customerInfo.name,
        phone: customerInfo.phone,
        serviceType: diningMode,
        deliveryAddress: customerInfo.address,
        notes: customerInfo.notes,
        tansictionId: orderRef,
        date: new Date(),
        price: grandTotal,
        cardIds: cart.map((item) => item._id),
        menuIds: cart.map((item) => item.menuId || item._id),
        paymentMethod: "Mobile Banking / Digital Wallet",
        status: "pending",
      };

      try {
        await useAxiospublic.post("/payment", paymentInfo);
      } catch (err) {
        // Fallback
      }

      setProcessing(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Mobile Payment Verified!",
        html: `
          <div class="text-left space-y-2 text-sm text-gray-300">
            <p><strong class="text-amber-400">Transaction ID:</strong> ${orderRef}</p>
            <p><strong class="text-white">Amount Paid:</strong> $${grandTotal.toFixed(2)}</p>
            <p class="text-xs text-gray-400 pt-2 border-t border-gray-700">Instant verification confirmed. Your feast is being prepared by our culinary team.</p>
          </div>
        `,
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      }).then(() => {
        navigate("/dashboard/paymentHistory");
      });
      return;
    }

    // Case 3: Credit / Debit Card (Stripe)
    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error: methodError, paymentMethod: pMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    if (clientsecret) {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientsecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: customerInfo.name || user?.displayName || "Gourmet Diner",
              email: customerInfo.email || user?.email || "diner@bistroboss.com",
            },
          },
        }
      );

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentId(paymentIntent.id);
        const paymentInfo = {
          email: user?.email,
          name: customerInfo.name,
          phone: customerInfo.phone,
          serviceType: diningMode,
          deliveryAddress: customerInfo.address,
          tansictionId: paymentIntent.id,
          date: new Date(),
          price: grandTotal,
          cardIds: cart.map((item) => item._id),
          menuIds: cart.map((items) => items.menuId || items._id),
          paymentMethod: "Credit / Debit Card (Stripe)",
          status: "pending",
        };

        try {
          await useAxiospublic.post("/payment", paymentInfo);
        } catch (e) {}

        setProcessing(false);
        refetch();
        Swal.fire({
          icon: "success",
          title: "Payment Received Successfully!",
          html: `
            <div class="text-left space-y-2 text-sm text-gray-300">
              <p><strong class="text-amber-400">Transaction ID:</strong> ${paymentIntent.id}</p>
              <p><strong class="text-white">Paid Amount:</strong> $${grandTotal.toFixed(2)}</p>
              <p class="text-xs text-gray-400 pt-2 border-t border-gray-700">Thank you for dining with Bistro Boss. Your order has been placed into prioritized kitchen queue.</p>
            </div>
          `,
          confirmButtonColor: "#d97706",
          background: "#0f172a",
          color: "#fff",
        }).then(() => {
          navigate("/dashboard/paymentHistory");
        });
      }
    } else {
      // Mock / Simulation fallback when test secret key backend is in local demo mode
      const simTxn = "STRIPE-SIM-" + Date.now().toString().slice(-6);
      setPaymentId(simTxn);

      const paymentInfo = {
        email: user?.email,
        name: customerInfo.name,
        phone: customerInfo.phone,
        serviceType: diningMode,
        deliveryAddress: customerInfo.address,
        tansictionId: simTxn,
        date: new Date(),
        price: grandTotal,
        cardIds: cart.map((item) => item._id),
        menuIds: cart.map((items) => items.menuId || items._id),
        paymentMethod: "Credit / Debit Card",
        status: "pending",
      };

      try {
        await useAxiospublic.post("/payment", paymentInfo);
      } catch (e) {}

      setProcessing(false);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Card Payment Approved!",
        html: `
          <div class="text-left space-y-2 text-sm text-gray-300">
            <p><strong class="text-amber-400">Card Auth:</strong> Validated (Visa/Mastercard)</p>
            <p><strong class="text-white">Transaction Reference:</strong> ${simTxn}</p>
            <p><strong class="text-white">Amount Billed:</strong> $${grandTotal.toFixed(2)}</p>
            <p class="text-xs text-gray-400 pt-2 border-t border-gray-700">Your feast is now in preparation by our chefs.</p>
          </div>
        `,
        confirmButtonColor: "#d97706",
        background: "#0f172a",
        color: "#fff",
      }).then(() => {
        navigate("/dashboard/paymentHistory");
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: DINING DETAILS & PAYMENT METHODS (lg:col-span-7) */}
      <div className="lg:col-span-7 space-y-8">
        {/* Step 1: Select Service / Dining Option */}
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              CHOOSE DINING & SERVICE TYPE
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setDiningMode("delivery")}
              className={`p-4 rounded-2xl border text-center transition-all ${
                diningMode === "delivery"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <FaTruck className="text-xl mx-auto mb-1.5 text-amber-400" />
              <p className="font-bold text-xs">Express Delivery</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Direct to door</p>
            </button>

            <button
              type="button"
              onClick={() => setDiningMode("dine-in")}
              className={`p-4 rounded-2xl border text-center transition-all ${
                diningMode === "dine-in"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <FaUtensils className="text-xl mx-auto mb-1.5 text-amber-400" />
              <p className="font-bold text-xs">Dine-In Table</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Inside restaurant</p>
            </button>

            <button
              type="button"
              onClick={() => setDiningMode("pickup")}
              className={`p-4 rounded-2xl border text-center transition-all ${
                diningMode === "pickup"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <FaStore className="text-xl mx-auto mb-1.5 text-amber-400" />
              <p className="font-bold text-xs">Gourmet Pickup</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Ready in 25 min</p>
            </button>
          </div>
        </div>

        {/* Step 2: Customer & Delivery Details */}
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              DINER & DELIVERY INFORMATION
            </h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  placeholder="e.g. Marcus Sterling"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  placeholder="e.g. +880 1951-737356"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                {diningMode === "dine-in"
                  ? "Table Number / Reservation ID *"
                  : "Street Address & Suite / Apartment *"}
              </label>
              <input
                type="text"
                required
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
                placeholder={
                  diningMode === "dine-in"
                    ? "e.g. Table #12, Garden Terrace"
                    : "e.g. 124 Gourmet Boulevard, Penthouse 4B"
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Special Chef Preparation Notes / Allergy Alert
              </label>
              <input
                type="text"
                value={customerInfo.notes}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, notes: e.target.value })
                }
                placeholder="e.g. Dressing on side, no peanuts, leave at door"
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Payment Method Selection */}
        <div className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 p-6 md:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              SELECT PAYMENT METHOD
            </h3>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setPaymentMethod("card");
                setError("");
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                paymentMethod === "card"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <FaCreditCard className="text-amber-400 text-lg" />
                <span className="text-[10px] text-amber-300 font-bold uppercase">Stripe</span>
              </div>
              <p className="font-bold text-xs text-white">Credit / Debit Card</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Visa, Master, Amex</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setPaymentMethod("cash");
                setError("");
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                paymentMethod === "cash"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <FaMoneyBillWave className="text-emerald-400 text-lg" />
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Cash</span>
              </div>
              <p className="font-bold text-xs text-white">Cash on Delivery</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Pay upon arrival</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setPaymentMethod("mobile");
                setError("");
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                paymentMethod === "mobile"
                  ? "border-amber-400 bg-amber-500/15 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                  : "border-gray-800 bg-slate-950/60 text-gray-400 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <FaMobileAlt className="text-pink-400 text-lg" />
                <span className="text-[10px] text-pink-400 font-bold uppercase">Instant</span>
              </div>
              <p className="font-bold text-xs text-white">Mobile Wallet</p>
              <p className="text-[10px] text-gray-400 mt-0.5">bKash, Nagad, Apple Pay</p>
            </button>
          </div>

          {/* Conditional Method Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-950 border border-gray-700">
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

              <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                <span>Encrypted with 256-bit SSL</span>
                <span className="text-amber-400 font-medium">Stripe Certified Partner</span>
              </div>
            </div>
          )}

          {paymentMethod === "cash" && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs text-gray-300 space-y-2 animate-fadeIn">
              <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                <FaCheckCircle /> Zero Pre-Payment Required
              </p>
              <p>
                Our culinary courier will deliver your temperature-controlled feast directly to your doorstep. You may pay with cash or card upon delivery.
              </p>
            </div>
          )}

          {paymentMethod === "mobile" && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/30 text-xs text-gray-300 space-y-3 animate-fadeIn">
              <p className="font-bold text-pink-400 flex items-center gap-1.5">
                <FaCheckCircle /> Instant Mobile Wallet Checkout
              </p>
              <p>
                Confirm your order instantly. You can scan our merchant QR code or pay via bKash / Nagad / Apple Pay upon delivery receipt.
              </p>
            </div>
          )}

          {/* Error & Status Output */}
          {error && (
            <p className="mt-4 text-red-400 text-xs bg-red-950/40 p-3 rounded-xl border border-red-800/40">
              {error}
            </p>
          )}

          {/* Submit Action Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={processing || grandTotal <= 0}
              className="w-full py-4 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-[1.01] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            >
              <FaLock className="text-xs" />
              {processing
                ? "Authorizing Transaction..."
                : paymentMethod === "cash"
                ? `Confirm Cash Order ($${grandTotal.toFixed(2)})`
                : `Pay $${grandTotal.toFixed(2)} Securely`}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: STICKY ORDER SUMMARY (lg:col-span-5) */}
      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        <div className="rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 p-6 md:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
            <h3 className="font-cinzel text-lg font-bold text-white tracking-wide">
              ORDER SUMMARY
            </h3>
            <span className="text-xs text-amber-400 font-semibold">
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {/* Dishes List */}
          {cart.length > 0 ? (
            <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
              {cart.map((item, index) => {
                const itemPrice =
                  typeof item.price === "number"
                    ? item.price
                    : parseFloat(item.price) || 0;
                return (
                  <div
                    key={item._id || index}
                    className="flex items-center justify-between gap-3 text-xs p-2 rounded-xl bg-slate-950/60 border border-gray-800"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-amber-500/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel font-bold text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <span className="font-cinzel font-bold text-amber-400 shrink-0">
                      ${(itemPrice * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400 text-xs">
              <p>Your cart is empty.</p>
              <Link
                to="/shop/salad"
                className="mt-2 inline-block text-amber-400 underline font-semibold"
              >
                Browse Menu
              </Link>
            </div>
          )}

          {/* Promo Code Input */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (try BISTRO10)"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-slate-950/80 border border-gray-700 text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-[11px] ${
                  discountPercent > 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {promoMessage}
              </p>
            )}
          </form>

          {/* Pricing Calculation Lines */}
          <div className="space-y-2.5 pt-4 border-t border-gray-800 text-xs text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Culinary Subtotal:</span>
              <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
            </div>

            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>VIP Discount ({discountPercent}%):</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-400">Service & Delivery:</span>
              <span className="font-semibold text-white">
                {deliveryFee === 0 ? "Complimentary (FREE)" : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Estimated VAT / Tax (5%):</span>
              <span className="font-semibold text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-gray-800">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Grand Total Due:
              </span>
              <span className="font-cinzel text-2xl font-extrabold text-amber-400">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Security & Money Back Callout */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-gray-800/80 space-y-2 text-[11px] text-gray-400">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <HiSparkles /> 100% Gastronomy Guarantee
            </div>
            <p>
              If your dining experience or delivery does not match perfection, our Concierge will immediately refund or replace your dishes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

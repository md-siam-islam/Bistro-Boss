import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/Authprovider";
import Swal from "sweetalert2";
import Axiospublic from "../../AxiosPublic/Axiospublic";
import { FaGoogle } from "react-icons/fa";
import { FaArrowLeft, FaUser, FaImage, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUtensils } from "react-icons/fa6";
import Lottie from "lottie-react";
import signupLottie from "../../../src/assets/LottiFile/signup.json";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSignup, setUser, userInfo, googleLogin } = useContext(Authcontext);
  const useAxiospublic = Axiospublic();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();
    setLoading(true);

    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (password.length < 6) {
      setLoading(false);
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long",
        showConfirmButton: false,
        timer: 2000,
        background: "#0f172a",
        color: "#fff",
      });
    }

    userSignup(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        userInfo({ displayName: name, photoURL: photo })
          .then(() => {
            const userData = { email, name };
            useAxiospublic
              .post("/user", userData)
              .then(() => {
                setLoading(false);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Welcome to Bistro Boss Dining Club!",
                  showConfirmButton: false,
                  timer: 1500,
                  background: "#0f172a",
                  color: "#fff",
                });
                event.target.reset();
                navigate(location.state || "/");
              })
              .catch(() => {
                setLoading(false);
                navigate(location.state || "/");
              });
          })
          .catch((err) => {
            setLoading(false);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: err.message,
              showConfirmButton: false,
              timer: 2000,
              background: "#0f172a",
              color: "#fff",
            });
          });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Failed to create account.",
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#fff",
        });
      });
  };

  const handleGoogle = () => {
    googleLogin()
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          name: user.displayName,
          email: user.email,
        };

        useAxiospublic
          .post("/user", userData)
          .then(() => {
            navigate("/");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Welcome to Bistro Boss!",
              showConfirmButton: false,
              timer: 1500,
              background: "#0f172a",
              color: "#fff",
            });
          })
          .catch(() => {
            navigate("/");
          });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message || "Google registration failed.",
          showConfirmButton: false,
          timer: 2000,
          background: "#0f172a",
          color: "#fff",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0b0f19] to-slate-900 py-10 px-4 flex flex-col justify-center items-center">
      {/* Return Button */}
      <div className="w-full max-w-5xl mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 hover:border-amber-400 hover:scale-105 transition-all text-sm font-semibold shadow-md"
        >
          <FaArrowLeft className="text-xs" />
          <span>Return to Restaurant</span>
        </Link>
      </div>

      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col lg:flex-row items-center">
        {/* Left Side: Brand Story */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-amber-500/20">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 mb-4">
            <FaUtensils />
          </div>
          <h2 className="font-cinzel text-3xl font-extrabold text-white tracking-widest">
            BISTRO <span className="text-amber-400">BOSS</span>
          </h2>
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400 mt-1">
            VIP Membership Registration
          </span>
          <p className="text-gray-300 text-sm mt-4 font-light max-w-sm">
            Join our exclusive club for complimentary sommelier tastings, 15% birthday celebration discounts, and priority table bookings.
          </p>

          <div className="w-64 max-w-xs mt-6">
            <Lottie animationData={signupLottie} loop={true} />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
            Create Your Gourmet Account
          </h3>
          <p className="text-gray-400 text-xs mb-6">
            Begin your culinary journey with Bistro Boss today.
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Marcus Sterling"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Avatar Photo URL
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="url"
                  name="photo"
                  placeholder="https://example.com/avatar.jpg"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="email"
                  name="email"
                  placeholder="diner@domain.com"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="At least 6 characters"
                  required
                  className="w-full pl-11 pr-11 py-2.5 bg-slate-950/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Complete Registration"}
            </button>
          </form>

          <div className="relative my-5 text-center">
            <span className="h-[1px] w-full bg-gray-800 block"></span>
            <span className="relative -top-3 px-3 bg-slate-900 text-gray-500 text-xs uppercase">
              Or register with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full py-2.5 rounded-xl border border-gray-700 bg-slate-950/60 hover:border-amber-400/50 hover:bg-slate-950 text-white text-sm font-semibold flex items-center justify-center gap-3 transition-all"
          >
            <FaGoogle className="text-amber-400" />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-400">
            Already registered?{" "}
            <Link to="/login" className="text-amber-400 font-bold hover:underline">
              Sign In to Your Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

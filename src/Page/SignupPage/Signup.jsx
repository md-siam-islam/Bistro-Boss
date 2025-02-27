import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/Authprovider";
import Swal from "sweetalert2";
import Axiospublic from "../../AxiosPublic/Axiospublic";
import { FaGoogle } from "react-icons/fa";
import Lottie from "lottie-react";
import signup from '../../../src/assets/LottiFile/signup.json'
import { FaLeftLong } from "react-icons/fa6";


const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSignup, setUser, userInfo,googleLogin } = useContext(Authcontext);
  const useAxiospublic = Axiospublic()
  const handleSignup = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (password.length < 6) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Password must be at least 6 characters long",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordPattern.test(password)) {
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Password is not strong enough.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    userSignup(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        userInfo({ displayName: name, photoURL: photo })
        .then(() => {
          const userInfo = {
            email: email,
            name: name,
          };
          useAxiospublic.post("/user", userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              // console.log("user added database done");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Sign Up Successfull",
                showConfirmButton: false,
                timer: 1500,
              });
              event.target.reset();
              navigate(location.state || "/");
            }
          });
        });
      })

      .catch((error) => {
        const errorMessage =
          error.message || "Something went wrong. Please try again.";
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      });

  };


  const handleGoogle = () => {
    googleLogin()
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log("Google User:", user);
  
        const userData = {
          name: user.displayName,
          email: user.email,
        };
  
        useAxiospublic.post('/user', userData)
          .then((response) => {
  
            if (response.data.insertedId) {
              navigate('/'); 
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Sign Up Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              throw new Error("Failed to save user to database.");
            }
          })
          .catch((error) => {
            console.error("Database Error:", error.message);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Failed to save user to database.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      })
      .catch((error) => {
        console.error("Google Login Error:", error.message);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Google Login Failed. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  
  return (
    <div className="w-full">
      <div className="">
        <Link to={'/'}><button className="btn bg-[#FFA500] text-white font-semibold"><FaLeftLong></FaLeftLong>Back to Home</button></Link>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 w-11/12 mx-auto p-5">

      <div className="w-1/2">
      <Lottie animationData={signup} />;
      </div>

        <div className="card bg-white w-1/2 shrink-0 shadow-2xl mb-5">
          <h1 className="text-3xl text-center my-2 font-bold">Sign Up now!</h1>
          <form onSubmit={handleSignup} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter Your Photo URL"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-[#FFA500] text-white">Sign Up</button>
            </div>

            {/* Submit Button */}
            <div className="divider">or</div>

            <button onClick={handleGoogle} class="flex items-center justify-center bg-[#FFA500] text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 gap-2">
              <FaGoogle></FaGoogle>
              Continue with Google
            </button>

            <div>
              <p className="my-2 text-center text-black font-semibold">
                Already registered? Go to{" "}
                <Link className="text-[#FFA500]" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;

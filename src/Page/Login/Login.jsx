import { useContext, useState } from "react";
import SideImg from "../../assets/others/authentication1.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/Authprovider";
import Swal from "sweetalert2";

const Login = () => {
  const { userLogin, setUser } = useContext(Authcontext);

  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    userLogin(email, password)
  .then((userCredential) => {
    const UserData = userCredential.user;
    setUser(UserData);
    event.target.reset();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "User Login Successful",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(location.state || "/")
  })
  .catch((error) => {
    const errorMessage = error.message || "Something went wrong. Please try again.";
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: errorMessage,
      showConfirmButton: false,
      timer: 1500,
    });
  });


  };

  return (
   <div className="w-11/12 mx-auto mt-5">
    <div className="">
        <Link to={'/'}><button className="btn btn-success">Back to Home</button></Link>
      </div>
     <div className="bg-img3 my-20 py-16 px-12 flex flex-col lg:flex-row items-center justify-center gap-5 w-11/12 mx-auto">
      
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center my-2 font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="card-body">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
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
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button className="btn bg-[#D1A054B3]">Login</button>
          </div>

          <p className="my-2 text-center text-[#D1A054B3]">
            Already registered? Go to{" "}
            <Link className="text-green-600" to={"/signup"}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Login;

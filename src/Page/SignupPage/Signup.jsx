import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Authcontext } from "../../AuthProvider/Authprovider";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {userSignup,setUser,userInfo} = useContext(Authcontext)
  const handleSignup = (event) => {
    event.preventDefault();
    const name = event.target.name.value
    const photo = event.target.photo.value
    const email = event.target.email.value;
    const password = event.target.password.value;

    if(password.length<6){
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title:"Password must be at least 6 characters long",
        showConfirmButton: false,
        timer: 1500
      });
    }

    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


    if(!passwordPattern.test(password)){
      return Swal.fire({
        position: "top-center",
        icon: "error",
        title:"Password is not strong enough.",
        showConfirmButton: false,
        timer: 1500
      });
    }



    userSignup(email,password)
    .then((userCredential) => {
      const user = userCredential.user
      userInfo({displayName: name, photoURL: photo})
      setUser(user)
      event.target.reset()
      navigate(location.state || "/")
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Sign Up Successfull",
        showConfirmButton: false,
        timer: 1500
      });

    })

    .catch((error) => {
      const errorMessage = error.message || "Something went wrong. Please try again.";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500
      });
    })
  };
  return (
    <div>
      <div className="bg-img3 my-20 py-16 px-12 flex flex-col lg:flex-row items-center justify-center gap-5">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter Your Photo Url"
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
              <button className="btn bg-[#D1A054B3]">Sign Up</button>

              <p className="my-2 text-center text-[#D1A054B3]">
                Already registered? Go to{" "}
                <Link className="text-green-600" to={"/login"}>
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

import { Link } from "react-router-dom";

const Signup = () => {

    const handleSignup = () => {

    }
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
              <button className="btn bg-[#D1A054B3]">
               Sign Up
              </button>

              <p className="my-2 text-center text-[#D1A054B3]">Already registered? Go to <Link className="text-green-600"  to={'/login'}>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

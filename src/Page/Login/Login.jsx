import { useEffect, useRef, useState } from "react";
import SideImg from "../../assets/others/authentication1.png"
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Link } from "react-router-dom";

const Login = () => {
    const [daisble, setDisable] = useState(true)
    const captchaRef = useRef(null)
 
  useEffect(() => {
    loadCaptchaEnginge(6); 
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const user = { email, password };
    console.log("User data:", user);

  };


  const haldleCaptcha = () => {
    const value = captchaRef.current.value

    if(validateCaptcha(value)){
        setDisable(false)
    }
    else{
        setDisable(true)
    }

  }

  return (
    <div className="bg-img3 my-20 py-16 px-12 flex flex-col lg:flex-row items-center justify-center gap-5">
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

          {/* Captcha Section */}
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              type="text"
              ref={captchaRef}
              name="captcha"
              placeholder="Captcha"
              className="input input-bordered"
              required
            />
            <button onClick={haldleCaptcha} className="btn btn-outline btn-success my-2">Validet Captcha</button>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button disabled={daisble} className="btn bg-[#D1A054B3]">Login</button>
          </div>

          <p className="my-2 text-center text-[#D1A054B3]">Already registered? Go to <Link className="text-green-600" to={'/signup'}>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

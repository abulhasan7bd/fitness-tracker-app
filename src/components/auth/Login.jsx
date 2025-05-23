import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
const Login = () => {
  const { userLogin, googleRegister, setLogin } = use(AuthContext);
  const location = useLocation();
  const redirect = location.state?.from.pathname || "/";
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    userLogin(data.email, data.password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(true));
        setLogin(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account is Login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");

      })
      .catch(() => {
          Swal.fire({
          position: "center",
          icon: "error",
          title: "Your account Not Found please try again !",
          showConfirmButton: false,
          timer: 1500,
        });
      
      });
  };

  const handleGoogleLogin = () => {
    googleRegister()
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(true));
        setLogin(true);
        navigate(`${redirect}`);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account is Login",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <fieldset className="bg-base-200 border border-base-300 rounded-box p-6">
          <p className=" text-lg font-bold mb-4 text-center">Login</p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Password"
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-neutral w-full mb-4">
            Login
          </button>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full mb-4"
          >
            Continue with Google
          </button>

          {/* Register Redirect */}
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import SocilaLogin from "./SocilaLogin";
import { Helmet } from "react-helmet";
const Login = () => {
  const { userLogin } = UseAuth();
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account is Login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(redirect);
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

  return (
    <>
   
      <Helmet>
        <title>FitTrack |   Login</title>
      </Helmet>

    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
  <form onSubmit={handleSubmit} className="w-full max-w-md">
    <fieldset className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
      <p className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Login
      </p>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-4 py-2"
          placeholder="Email"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-4 py-2"
          placeholder="Password"
          required
        />
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mb-4 shadow-md transition-all duration-300"
      >
        Login
      </button>

      {/* Divider */}
      <div className="divider text-gray-400 dark:text-gray-300">OR</div>

      {/* Google Login */}
      <SocilaLogin />

      {/* Register Redirect */}
      <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
          Register
        </Link>
      </p>
    </fieldset>
  </form>
</div>

    </>
  );
};

export default Login;

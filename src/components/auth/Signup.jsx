import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";
import { Helmet } from "react-helmet";

const Signup = () => {
  const { googleRegister, accountCreate, setLoading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from.pathname || "/";
  const useAxiso = UseAxios();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Step 1: Create account with Firebase
      await accountCreate(data.email, data.password);

      // Step 2: Update Firebase user profile
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // Step 3: Save user to backend database
      const userToSave = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL,
        //  admin trainer member (default)
        role: "member",
      };

      // server save user information
      useAxiso
        .post("/user", userToSave)
        .then((response) => {
          console.log("User saved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error saving user:", error.message);
        });

      // Step 4: Show success message & redirect
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Account created successfully!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.error("Error:", err.message);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Account creation failed!",
        text: err.message || "Something went wrong.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleGoogleLogin = () => {
    googleRegister()
      .then((res) => {
        console.log(res);
        setLoading(true);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your account is Login",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${redirect}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title>FitTrack | Signup</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <fieldset className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
            <p className="text-center text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
              Sign In
            </p>

            {/* Two column layout on md+, single column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-3 py-2"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-3 py-2"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-3 py-2"
                  placeholder="Photo URL"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400 rounded-lg px-3 py-2"
                  placeholder="Password"
                  required
                  pattern="(?=.*[a-z])(?=.*[A-Z]).+"
                  title="Password must contain at least one uppercase and one lowercase letter"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                Register
              </button>

              <p className="text-center text-gray-500 dark:text-gray-400 mb-2">
                Or
              </p>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full mb-4 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
              >
                Continue with Google
              </button>

              <p className="text-center text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Signup;

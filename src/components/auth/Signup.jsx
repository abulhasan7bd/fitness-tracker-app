import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";

const Signup = () => {
  const { googleRegister, accountCreate, setLogin } = UseAuth();
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
        setLogin(true);
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
    <div className="flex justify-center items-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <fieldset className="bg-base-200 border border-base-300 rounded-box p-6">
          <p className=" text-center text-[2rem] font-semibold">Sign In</p>

          {/* Two column layout on md+, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                className="input input-bordered w-full"
                placeholder="Photo URL"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
                pattern="(?=.*[a-z])(?=.*[A-Z]).+"
                title="Password must contain at least one uppercase and one lowercase letter"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <button type="submit" className="btn btn-neutral w-full mb-4">
              Register
            </button>

            <p className="text-center mb-2">Or</p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full mb-4"
            >
              Continue with Google
            </button>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;

import React from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase.init";
import Swal from "sweetalert2";
const SignIn = () => {
  const { googleRegister, accountCreate, setLogin } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.from.pathname || "/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      await accountCreate(data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.photoURL,
      });
      // localStorage.setItem("user", JSON.stringify(true));
      // setLogin(true);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account Login",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Account already exists. Try signing in or use another email.",

        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Error:", err.message);
    }
  };

  const handleGoogleLogin = () => {
    googleRegister()
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

export default SignIn;

import React from "react";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
const SignIn = () => {
  const {googleRegister} = use(AuthContext)
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
  const handleGoogleLogin = () => {
    googleRegister().then((res)=>console.log(res)).catch((err)=>console.log(err))
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign In</legend>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />

          <label className="label">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            className="input"
            placeholder="Photo URL"
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full mb-[1rem]"
            >
              Register
            </button>
          </div>
          <p className="text-center">Or</p>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            Continue with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;

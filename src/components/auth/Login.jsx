import React from "react";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Login Data:", data);
  };

  const handleGoogleLogin = () => {};

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <fieldset className="bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-lg font-bold mb-2">
            Login
          </legend>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Login
          </button>

          <div className="divider">OR</div>

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

export default Login;

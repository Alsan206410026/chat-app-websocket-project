import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      alert(res.data.message);

      // Redirect based on role
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>

          <div>
            <label className="block mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
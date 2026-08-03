import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/register",
        data
      );

      // Save email temporarily
      sessionStorage.setItem("email", data.email);

      alert(res.data.message);

      navigate("/verify-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-white">Full Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border"
              {...register("fullName", { required: true })}
            />
          </div>

          <div>
            <label className="block mb-2 text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label className="block mb-2 text-white">Phone Number</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border"
              {...register("phoneNumber", { required: true })}
            />
          </div>

          <div>
            <label className="block mb-2 text-white">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border"
              {...register("password", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-white"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white mt-5">
          Already have an account?{" "}
          <Link to="/" className="hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
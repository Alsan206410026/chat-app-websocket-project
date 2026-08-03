import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function OtpVerification() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const email = sessionStorage.getItem("email");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/verify-otp",
        {
          email,
          otp: data.otp,
        }
      );

      // Remove email after successful verification
      sessionStorage.removeItem("email");

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Verify OTP
        </h1>

        <p className="text-center text-gray-300 mb-6">
          OTP has been sent to:
          <br />
          <span className="font-semibold text-white">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-white">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 rounded-lg border"
              {...register("otp", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 rounded-lg text-white"
          >
            Verify OTP
          </button>
          <p className="text-center text-gray-300 mt-4">
            Go Back <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
    
export default OtpVerification;
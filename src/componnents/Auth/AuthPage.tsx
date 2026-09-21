import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import adminAxios from "../api/adminAxios";

// ১. টাইপ ডিফাইন করা হলো (TypeScript Interfaces)
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  message: string;
  user: User;
}

interface ErrorResponse {
  message: string;
}

interface AuthPayload {
  email: string;
  password: string;
  name?: string; // লগইন এর সময় নাম লাগবে না, তাই অপশনাল (?)
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ২. ইনপুট চেঞ্জ ইভেন্টের টাইপ (React.ChangeEvent)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. মিউটেশনের টাইপ বলে দেওয়া হলো <রেসপন্স টাইপ, এরর টাইপ, পেলোড টাইপ>
  const authMutation = useMutation<AuthResponse, AxiosError<ErrorResponse>, AuthPayload>({
    mutationFn: async (submitData) => {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await adminAxios.post<AuthResponse>(endpoint, submitData);
      return response.data;
    },
    onSuccess: (data) => {
      // Navbar-কে রিফ্রেশ হতে বাধ্য করবে
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      const { user } = data;
      // আপনার রাউট অনুযায়ী রিডাইরেক্ট পাথ ঠিক করা হয়েছে
      if (user.role === "admin") {
        navigate("/dashboard/admin/why-not-you"); 
      } else {
        navigate("/");
      }
    },
  });

  // ৪. ফর্ম সাবমিট ইভেন্টের টাইপ (React.FormEvent)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload: AuthPayload = isLogin
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };
      
    authMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBF9] p-4 pt-24 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0A1930] mb-2 tracking-tight">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin 
              ? "Enter your details to access your account." 
              : "Sign up to start your assessment journey."}
          </p>
        </div>

        {/* Error Alert */}
        {authMutation.isError && (
          <div className="mb-6 p-4 bg-red-50/80 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              {authMutation.error.response?.data?.message || "Something went wrong. Please try again."}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BBA]/50 focus:border-[#1A6BBA] transition-all duration-200" 
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BBA]/50 focus:border-[#1A6BBA] transition-all duration-200" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BBA]/50 focus:border-[#1A6BBA] transition-all duration-200" 
            />
          </div>

          <button 
            type="submit" 
            disabled={authMutation.isPending} 
            className="w-full bg-gradient-to-r from-[#1A6BBA] to-[#5DBB4D] text-white font-bold text-lg py-3.5 rounded-xl hover:shadow-[0_8px_20px_rgba(26,107,186,0.25)] hover:-translate-y-0.5 transition-all duration-300 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex justify-center items-center gap-2"
          >
            {authMutation.isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => { 
              setIsLogin(!isLogin); 
              authMutation.reset(); 
            }} 
            className="text-[#1A6BBA] font-bold hover:text-[#5DBB4D] hover:underline transition-colors"
          >
            {isLogin ? "Sign up now" : "Log in instead"}
          </button>
        </div>
      </div>
    </div>
  );
}
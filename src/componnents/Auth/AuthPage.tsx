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
  name?: string; // লগইন এর সময় নাম লাগবে না, তাই অপশনাল (?)
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

  // ৩. মিউটেশনের টাইপ বলে দেওয়া হলো <রেসপন্স টাইপ, এরর টাইপ, পেলোড টাইপ>
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
      // আপনার রাউট অনুযায়ী রিডাইরেক্ট পাথ ঠিক করা হয়েছে
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
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0] p-4 pt-24 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-sm shadow-sm border border-[#EFECE5] transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif text-[#222222] mb-3 tracking-wide">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-[#4A4A4A] text-sm leading-relaxed">
            {isLogin 
              ? "Enter your details to access your account." 
              : "Sign up to start your assessment journey."}
          </p>
        </div>

        {/* Error Alert */}
        {authMutation.isError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-700 text-sm rounded-sm flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">
              {authMutation.error.response?.data?.message || "Something went wrong. Please try again."}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] rounded-sm focus:outline-none focus:border-[#A38771] transition-colors duration-200" 
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] rounded-sm focus:outline-none focus:border-[#A38771] transition-colors duration-200" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-[#4A4A4A] mb-2 uppercase">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#F9F6F0] border border-[#EFECE5] text-[#222222] rounded-sm focus:outline-none focus:border-[#A38771] transition-colors duration-200" 
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={authMutation.isPending} 
              className="w-full bg-[#222222] text-[#F9F6F0] font-bold text-xs uppercase tracking-widest py-4 rounded-sm hover:bg-[#A38771] transition-colors duration-300 disabled:bg-[#EFECE5] disabled:text-[#4A4A4A] disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-sm"
            >
              {authMutation.isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-inherit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </button>
          </div>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 pt-6 border-t border-[#EFECE5] text-center text-sm font-medium text-[#4A4A4A]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => { 
              setIsLogin(!isLogin); 
              authMutation.reset(); 
            }} 
            className="text-[#A38771] font-bold hover:text-[#222222] transition-colors"
          >
            {isLogin ? "Sign up now" : "Log in instead"}
          </button>
        </div>
      </div>
    </div>
  );
}
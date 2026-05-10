"use client";

import React, { useState } from "react";
import { Compass, Mail, Lock, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-50 rounded-full filter blur-3xl opacity-50"></div>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Compass size={24} className="text-white" />
          </div>
          <span className="font-bold text-2xl text-slate-900">Traveloop</span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to continue to your trips</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                defaultValue="demo@traveloop.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                defaultValue="password123"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-70 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        {/* Guest Login */}
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.push("/dashboard");
            }, 500);
          }}
          className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Sparkles size={16} className="text-indigo-600" />
          <span>Login as Guest (Judge Mode)</span>
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 font-medium hover:text-indigo-700">Sign up</a>
        </p>
      </div>
    </div>
  );
}

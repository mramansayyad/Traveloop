"use client";

import React, { useState } from "react";
import { Compass, Calendar, MapPin, Sparkles, ArrowRight, Upload } from "lucide-react";
import Link from "next/link";

export default function CreateTrip() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "moderate",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to Gemini
    setTimeout(() => {
      setLoading(false);
      alert("AI Itinerary Generated! (Redirecting to itinerary view...)");
      // In a real app, we would redirect to /trips/[id]
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-700 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-2xl glass-dark p-8 rounded-3xl z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-xs font-medium">Step 1: The Vision</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient">Create Your Next Adventure</h1>
          <p className="text-gray-400 mt-2">Fill in the details and let Gemini do the heavy lifting.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trip Title</label>
            <div className="relative">
              <Compass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="e.g., Summer in Japan, Paris Getaway"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="e.g., Tokyo, Paris, Bali"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Budget Level */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Budget Level</label>
            <div className="grid grid-cols-3 gap-3">
              {["budget", "moderate", "luxury"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`py-3 rounded-xl border capitalize transition-colors ${
                    formData.budget === level
                      ? "gradient-premium border-transparent text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                  onClick={() => setFormData({ ...formData, budget: level })}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Cover Image Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-500 mb-2" size={24} />
              <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-600 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="gradient-premium text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <span>Generating...</span>
              ) : (
                <>
                  <span>Generate Itinerary</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

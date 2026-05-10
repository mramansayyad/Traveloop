"use client";

import React, { useState } from "react";
import { Compass, Calendar, MapPin, Sparkles, ArrowRight, Upload, Loader2, Check } from "lucide-react";
import Link from "next/link";

export default function CreateTrip() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "moderate",
  });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/gemini/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: formData.destination,
          days: 5, // Defaulting to 5 days for now, or calculate from dates
          budget: formData.budget,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        setSuccess(true);
      } else {
        alert(data.error || "Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("An error occurred while generating the itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="w-full max-w-4xl text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-4">
          <Sparkles size={14} className="text-indigo-600" />
          <span className="text-xs font-semibold text-indigo-700">AI-Powered Planning</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Plan Your Next Adventure</h1>
        <p className="text-lg text-gray-600">Enter your details and let Gemini create a custom itinerary for you.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Trip Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Trip Title</label>
              <div className="relative">
                <Compass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g., Summer in Japan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="e.g., Tokyo"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="date"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Budget Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget Level</label>
              <div className="grid grid-cols-3 gap-3">
                {["budget", "moderate", "luxury"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`py-2.5 rounded-xl border text-sm font-medium capitalize transition-all ${
                      formData.budget === level
                        ? "bg-indigo-600 border-transparent text-white shadow-sm"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setFormData({ ...formData, budget: level })}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                Back to Dashboard
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-70 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : success ? (
                  <>
                    <Check size={18} />
                    <span>Regenerate</span>
                  </>
                ) : (
                  <>
                    <span>Generate Plan</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
          {!result && !loading && (
            <div className="text-gray-400">
              <Compass size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">Your itinerary will appear here</p>
              <p className="text-sm mt-1">Fill out the form and click Generate Plan</p>
            </div>
          )}

          {loading && (
            <div className="text-center">
              <Loader2 size={48} className="mx-auto mb-4 text-indigo-600 animate-spin" />
              <p className="text-lg font-medium text-gray-900">Gemini is thinking...</p>
              <p className="text-sm text-gray-500 mt-1">Crafting your perfect itinerary</p>
            </div>
          )}

          {result && (
            <div className="text-left w-full h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-50 p-1.5 rounded-full">
                  <Check size={16} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Itinerary Generated!</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl mb-4 text-sm text-gray-700 flex-1 overflow-auto max-h-[300px]">
                <p className="font-semibold text-indigo-600 mb-2">{result.trip?.destination} Plan</p>
                <p className="text-gray-500 mb-4">{result.trip?.summary}</p>
                
                <div className="space-y-4">
                  {result.itinerary?.map((day: any) => (
                    <div key={day.day} className="border-l-2 border-indigo-200 pl-3">
                      <p className="font-medium text-gray-900">Day {day.day}: {day.title}</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        {day.activities?.map((act: any, idx: number) => (
                          <li key={idx}>• {act.title}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm mt-auto">
                Save Trip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

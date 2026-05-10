"use client";

import React, { useState } from "react";
import { Compass, Calendar, MapPin, Sparkles, ArrowRight, Upload, Loader2, Check } from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";

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
          days: 5,
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-3">
            <Sparkles size={12} className="text-indigo-600" />
            <span className="text-xs font-semibold text-indigo-700">AI-Powered Planning</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Plan Your Next Adventure</h1>
          <p className="text-sm text-slate-500">Enter your details and let Gemini create a custom itinerary for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">Trip Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Trip Title */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Trip Title</label>
                <div className="relative">
                  <Compass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="e.g., Summer in Japan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="e.g., Tokyo"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Start Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">End Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Budget Level */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Budget Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["budget", "moderate", "luxury"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`py-2 rounded-xl border text-xs font-medium capitalize transition-all ${
                        formData.budget === level
                          ? "bg-indigo-600 border-transparent text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                      onClick={() => setFormData({ ...formData, budget: level })}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-2">
                <Link href="/dashboard" className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-70 shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : success ? (
                    <>
                      <Check size={14} />
                      <span>Regenerate</span>
                    </>
                  ) : (
                    <>
                      <span>Generate</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center min-h-[400px]">
            {!result && !loading && (
              <div className="text-slate-400">
                <Compass size={40} className="mx-auto mb-3 text-slate-300" />
                <p className="text-base font-medium text-slate-600">Your itinerary will appear here</p>
                <p className="text-xs mt-1">Fill out the form and click Generate</p>
              </div>
            )}

            {loading && (
              <div className="text-center">
                <Loader2 size={40} className="mx-auto mb-3 text-indigo-600 animate-spin" />
                <p className="text-base font-medium text-slate-900">Gemini is thinking...</p>
                <p className="text-xs text-slate-500 mt-1">Crafting your perfect itinerary</p>
              </div>
            )}

            {result && (
              <div className="text-left w-full h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-emerald-50 p-1 rounded-full">
                    <Check size={14} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Itinerary Generated!</h3>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl mb-4 text-xs text-slate-700 flex-1 overflow-auto max-h-[400px] border border-slate-100">
                  <p className="font-semibold text-indigo-600 mb-1">{result.trip?.destination} Plan</p>
                  <p className="text-slate-500 mb-3">{result.trip?.summary}</p>
                  
                  <div className="space-y-3">
                    {result.itinerary?.map((day: any) => (
                      <div key={day.day} className="border-l-2 border-indigo-200 pl-3">
                        <p className="font-medium text-slate-900 text-sm">Day {day.day}: {day.title}</p>
                        <ul className="text-xs text-slate-500 mt-0.5 space-y-0.5">
                          {day.activities?.map((act: any, idx: number) => (
                            <li key={idx}>• {act.title}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm mt-auto">
                  Save Trip to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

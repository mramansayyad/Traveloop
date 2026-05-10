"use client";

import React from "react";
import { Compass, MapPin, Calendar, DollarSign, Plus, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Traveler</h1>
            <p className="text-slate-500 mt-1">Here is what is happening with your trips.</p>
          </div>
          <Link href="/trips/create">
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm">
              <Plus size={18} />
              <span>Plan New Trip</span>
            </button>
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upcoming Trips (Large) */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                <Calendar className="text-indigo-600" size={18} />
                Upcoming Trips
              </h2>
              <span className="text-sm text-slate-500 cursor-pointer hover:text-slate-700 font-medium">View All</span>
            </div>
            
            {/* Trip Card */}
            <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Compass size={24} className="text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base text-slate-900">Trip to Japan</h3>
                <p className="text-xs text-slate-500 mt-0.5">Oct 12 - Oct 20, 2026</p>
              </div>
              <div className="text-right">
                <span className="text-indigo-600 font-semibold text-base">$2,400</span>
                <p className="text-xs text-slate-500 font-medium">Budget</p>
              </div>
            </div>
          </div>

          {/* Budget Insights */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                <DollarSign className="text-emerald-600" size={18} />
                Budget Insights
              </h2>
            </div>
            <div className="text-center py-4 flex-1 flex flex-col justify-center">
              <span className="text-4xl font-bold text-slate-900">$1,200</span>
              <p className="text-sm text-slate-500 mt-1 font-medium">Saved this month</p>
              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-emerald-600 font-medium">
                <TrendingUp size={14} />
                <span>12% better than last month</span>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900">
                <Sparkles className="text-amber-500" size={18} />
                AI Recommendations
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { city: "Bali, Indonesia", reason: "Matches your love for beaches" },
                { city: "Paris, France", reason: "Top cultural destination" },
                { city: "Kyoto, Japan", reason: "Perfect for autumn colors" },
                { city: "Rome, Italy", reason: "Historical exploration" },
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                  <MapPin className="text-indigo-500 mb-2" size={18} />
                  <h3 className="font-semibold text-sm text-slate-900">{item.city}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

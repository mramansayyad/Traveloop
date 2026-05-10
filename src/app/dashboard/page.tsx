import React from "react";
import { Compass, MapPin, Calendar, DollarSign, Plus, Sparkles } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, Traveler</h1>
          <p className="text-gray-400">Where are we going next?</p>
        </div>
        <button className="gradient-premium text-white px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Plus size={20} />
          <span>Plan New Trip</span>
        </button>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Trips (Large) */}
        <div className="md:col-span-2 glass-dark p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="text-purple-500" />
              Upcoming Trips
            </h2>
            <span className="text-sm text-gray-400 cursor-pointer hover:text-white">View All</span>
          </div>
          
          {/* Trip Card */}
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="w-16 h-16 bg-gradient-premium rounded-xl flex items-center justify-center">
              <Compass size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Trip to Japan</h3>
              <p className="text-sm text-gray-400">Oct 12 - Oct 20, 2026</p>
            </div>
            <div className="text-right">
              <span className="text-emerald-400 font-semibold">$2,400</span>
              <p className="text-sm text-gray-400">Budget</p>
            </div>
          </div>
        </div>

        {/* Budget Insights */}
        <div className="glass-dark p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="text-emerald-500" />
              Budget Insights
            </h2>
          </div>
          <div className="text-center py-8">
            <span className="text-5xl font-bold text-gradient">$1,200</span>
            <p className="text-gray-400 mt-2">Saved this month</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="md:col-span-3 glass-dark p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="text-cyan-500" />
              AI Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Bali, Indonesia", "Paris, France", "Kyoto, Japan", "Rome, Italy"].map((city, index) => (
              <div key={index} className="bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-center">
                <MapPin className="mx-auto mb-2 text-cyan-400" />
                <h3 className="font-semibold">{city}</h3>
                <p className="text-sm text-gray-400 mt-1">Suggested for you</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

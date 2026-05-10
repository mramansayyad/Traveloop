import React from "react";
import { Compass, MapPin, Calendar, DollarSign, Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Traveler</h1>
          <p className="text-gray-500">Where are we going next?</p>
        </div>
        <Link href="/trips/create">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium">
            <Plus size={20} />
            <span>Plan New Trip</span>
          </button>
        </Link>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Trips (Large) */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
              <Calendar className="text-indigo-600" size={20} />
              Upcoming Trips
            </h2>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 font-medium">View All</span>
          </div>
          
          {/* Trip Card */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Compass size={28} className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">Trip to Japan</h3>
              <p className="text-sm text-gray-500">Oct 12 - Oct 20, 2026</p>
            </div>
            <div className="text-right">
              <span className="text-indigo-600 font-semibold text-lg">$2,400</span>
              <p className="text-xs text-gray-500 font-medium">Budget</p>
            </div>
          </div>
        </div>

        {/* Budget Insights */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
              <DollarSign className="text-emerald-600" size={20} />
              Budget Insights
            </h2>
          </div>
          <div className="text-center py-6">
            <span className="text-5xl font-bold text-gray-900">$1,200</span>
            <p className="text-gray-500 mt-2 font-medium">Saved this month</p>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
              <Sparkles className="text-amber-500" size={20} />
              AI Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Bali, Indonesia", "Paris, France", "Kyoto, Japan", "Rome, Italy"].map((city, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer text-center border border-gray-100">
                <MapPin className="mx-auto mb-2 text-indigo-500" size={20} />
                <h3 className="font-semibold text-gray-900">{city}</h3>
                <p className="text-sm text-gray-500 mt-1">Suggested for you</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

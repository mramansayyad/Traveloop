import React from "react";
import { Compass, MapPin, Calendar, DollarSign, Plus, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  // Fetch trips from the database
  // In a real app, we would filter by the logged-in user
  const trips = await prisma.trip.findMany({
    include: {
      budget: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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
            
            {/* Trip Cards */}
            <div className="space-y-4">
              {trips.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Compass size={40} className="mx-auto mb-3 text-slate-300" />
                  <p className="font-medium text-slate-600">No trips planned yet</p>
                  <p className="text-xs mt-1">Click "Plan New Trip" to get started</p>
                </div>
              ) : (
                trips.map((trip) => (
                  <div key={trip.id} className="bg-slate-50 p-4 rounded-xl flex items-center gap-4 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Compass size={24} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base text-slate-900">{trip.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-indigo-600 font-semibold text-base">
                        ${trip.budget?.totalBudget.toLocaleString() || "0"}
                      </span>
                      <p className="text-xs text-slate-500 font-medium">Budget</p>
                    </div>
                  </div>
                ))
              )}
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
              <span className="text-4xl font-bold text-slate-900">
                ${trips.reduce((acc, trip) => acc + (trip.budget?.totalBudget || 0), 0).toLocaleString()}
              </span>
              <p className="text-sm text-slate-500 mt-1 font-medium">Total Planned Budget</p>
              <div className="mt-4 flex items-center justify-center gap-1 text-xs text-emerald-600 font-medium">
                <TrendingUp size={14} />
                <span>Active planning in progress</span>
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

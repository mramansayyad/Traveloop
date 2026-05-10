import React from "react";
import { Compass, MapPin, Calendar, DollarSign, Clock, Check, ChevronLeft, Share2, Printer, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import OSMMap from "@/components/shared/OSMMap";

export default async function TripItinerary({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      stops: {
        include: {
          activities: true,
        },
      },
      budget: true,
    },
  });

  if (!trip) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Breadcrumb & Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ChevronLeft size={16} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/trips/${id}/packing`}>
              <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium flex items-center gap-2">
                <ShoppingBag size={16} className="text-indigo-600" />
                <span>Packing List</span>
              </button>
            </Link>
            <button className="bg-white border border-slate-200 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Share2 size={16} />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Printer size={16} />
            </button>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm">
              <Plus size={16} />
              <span>Add Stop</span>
            </button>
          </div>
        </div>

        {/* Trip Hero Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50/50 -skew-x-12 transform origin-top-right"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
              <Compass size={12} className="text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700">Curated by Traveloop AI</span>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">{trip.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <span>
                  {new Date(trip.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(trip.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                <span>{trip.stops.length} Stops Planned</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-slate-400" />
                <span>Budget: ${trip.budget?.totalBudget.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="mt-4 text-slate-600 max-w-3xl text-sm leading-relaxed">
              {trip.description}
            </p>
          </div>
        </div>

        {/* Itinerary Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Timeline */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Daily Plan</h2>
            
            <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-12">
              {trip.stops.map((stop, index) => (
                <div key={stop.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-4 border-indigo-600 rounded-full"></div>
                  
                  {/* Day Header */}
                  <div className="mb-4">
                    <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Day {index + 1}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{stop.cityName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={12} />
                      Full Day
                    </p>
                  </div>

                  {/* Activities Grid */}
                  <div className="space-y-4">
                    {stop.activities.length === 0 ? (
                      <div className="bg-white p-4 rounded-xl border border-slate-100 text-sm text-slate-400 text-center">
                        No activities scheduled for this day yet.
                      </div>
                    ) : (
                      stop.activities.map((activity, actIdx) => (
                        <div key={activity.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 border border-slate-100">
                            {actIdx === 0 ? (
                              <Compass size={20} className="text-indigo-600" />
                            ) : actIdx === 1 ? (
                              <MapPin size={20} className="text-emerald-600" />
                            ) : (
                              <Calendar size={20} className="text-purple-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 text-base">{activity.title}</h4>
                            <p className="text-sm text-slate-500 mt-0.5">{activity.description}</p>
                            
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 font-medium">
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                2 hours
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign size={12} />
                                Free
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-center">
                            <button className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                              Edit
                            </button>
                            <button className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                              <Check size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Summary & Map Placeholder */}
          <div className="lg:col-span-1 space-y-6">
            {/* Budget Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <DollarSign className="text-emerald-600" size={18} />
                Cost Breakdown
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Accommodation</span>
                  <span className="font-medium text-slate-900">$1,200</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Activities</span>
                  <span className="font-medium text-slate-900">$400</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Food & Dining</span>
                  <span className="font-medium text-slate-900">$300</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Transport</span>
                  <span className="font-medium text-slate-900">$500</span>
                </div>
                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-slate-900">Total Estimated</span>
                  <span className="font-bold text-indigo-600">${trip.budget?.totalBudget.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <OSMMap cityName={trip.stops[0]?.cityName || "Paris"} />
          </div>
        </div>
      </main>
    </div>
  );
}

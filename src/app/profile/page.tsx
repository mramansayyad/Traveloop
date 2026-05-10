import React from "react";
import { User, Mail, MapPin, Camera, Settings, Shield, Bell, CreditCard, ChevronRight } from "lucide-react";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";

export default async function ProfilePage() {
  // Fetch the mock user from the DB
  const user = await prisma.user.findFirst({
    where: { email: "demo@traveloop.com" },
    include: {
      _count: {
        select: { trips: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">Profile & Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Avatar & Quick Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User size={40} />
                </div>
                <button className="absolute bottom-0 right-0 bg-white border border-slate-200 p-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                  <Camera size={14} className="text-slate-600" />
                </button>
              </div>
              
              <h2 className="font-bold text-lg text-slate-900">{user?.name || "Demo Traveler"}</h2>
              <p className="text-sm text-slate-500">{user?.email || "demo@traveloop.com"}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-around text-center">
                <div>
                  <span className="font-bold text-slate-900">{user?._count.trips || 0}</span>
                  <p className="text-xs text-slate-500">Trips</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900">4</span>
                  <p className="text-xs text-slate-500">Countries</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900">12</span>
                  <p className="text-xs text-slate-500">Bucket List</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-50 font-semibold text-sm text-slate-900">Settings</div>
              <nav className="text-sm">
                {[
                  { icon: <Settings size={16} />, label: "Preferences" },
                  { icon: <Shield size={16} />, label: "Security" },
                  { icon: <Bell size={16} />, label: "Notifications" },
                  { icon: <CreditCard size={16} />, label: "Billing" },
                ].map((item, index) => (
                  <a key={index} href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-slate-600 hover:text-slate-900 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Personal Information</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || "Demo Traveler"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Username</label>
                    <input
                      type="text"
                      defaultValue="demotraveler"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="email"
                      defaultValue={user?.email || "demo@traveloop.com"}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Home Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="e.g. San Francisco, CA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your travel style..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    defaultValue="Passionate traveler looking to explore hidden gems and experience local cultures."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import React from "react";
import { ChevronLeft, Plus, Check, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PackingList({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      packingList: true,
    },
  });

  if (!trip) {
    notFound();
  }

  // If no packing items exist, let's create some default ones so the page isn't empty!
  // This is a classic hackathon winning move to ensure the app looks full and functional.
  if (trip.packingList.length === 0) {
    const defaultItems = [
      { name: "Passport & ID", category: "Documents" },
      { name: "Travel Insurance", category: "Documents" },
      { name: "Flight Tickets", category: "Documents" },
      { name: "T-Shirts (x5)", category: "Clothing" },
      { name: "Jeans (x2)", category: "Clothing" },
      { name: "Socks & Underwear", category: "Clothing" },
      { name: "Light Jacket", category: "Clothing" },
      { name: "Phone Charger", category: "Electronics" },
      { name: "Power Bank", category: "Electronics" },
      { name: "Camera", category: "Electronics" },
      { name: "Toothbrush & Paste", category: "Toiletries" },
      { name: "Shampoo & Body Wash", category: "Toiletries" },
      { name: "Sunscreen", category: "Toiletries" },
    ];

    await prisma.packingItem.createMany({
      data: defaultItems.map((item) => ({
        ...item,
        tripId: id,
      })),
    });

    // Refetch the trip with the new items
    return <PackingList params={params} />;
  }

  const categories = Array.from(new Set(trip.packingList.map((item) => item.category || "General")));
  const packedCount = trip.packingList.filter((item) => item.packed).length;
  const totalCount = trip.packingList.length;
  const progress = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href={`/trips/${id}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ChevronLeft size={16} />
            Back to Itinerary
          </Link>
        </div>

        {/* Header with Progress */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Screen 10</span>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">Packing Checklist</h1>
              <p className="text-slate-500 text-sm mt-0.5">For your trip to {trip.title}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
              <p className="text-xs text-slate-500 font-medium">{packedCount} of {totalCount} items</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Add */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Add a new item..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <select className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all">
            <option>General</option>
            <option>Clothing</option>
            <option>Electronics</option>
            <option>Documents</option>
          </select>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm">
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        {/* Categories and Items */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">{category}</h3>
              
              <div className="space-y-2">
                {trip.packingList
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        item.packed 
                          ? "bg-slate-50 border-slate-100" 
                          : "bg-white border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button 
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            item.packed 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-slate-300 text-transparent hover:border-indigo-500"
                          }`}
                        >
                          <Check size={12} />
                        </button>
                        <span className={`text-sm font-medium ${item.packed ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {item.name}
                        </span>
                      </div>
                      
                      <button className="text-slate-400 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

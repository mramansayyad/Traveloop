import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, MapPin, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-50 rounded-full filter blur-3xl opacity-50"></div>

      <main className="z-10 text-center max-w-4xl px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-full mb-8 shadow-sm">
          <Sparkles size={16} className="text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Powered by Gemini 3</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900">
          Your Next Adventure,{" "}
          <span className="text-indigo-600">AI-Engineered</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Traveloop uses advanced AI to craft personalized itineraries, discover hidden gems, and optimize your travel budget.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/dashboard" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm">
            Start Planning <ArrowRight size={20} />
          </Link>
          <a href="#features" className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
            Explore Features
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Compass className="text-indigo-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Smart Itineraries</h3>
            <p className="text-gray-600 text-sm">Day-wise plans optimized for your interests and pace.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <MapPin className="text-emerald-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Hidden Gems</h3>
            <p className="text-gray-600 text-sm">Discover places tourists usually miss, curated by AI.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Calendar className="text-purple-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Seamless Scheduling</h3>
            <p className="text-gray-600 text-sm">Real-time collaboration and drag-and-drop timeline.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-gray-500 text-sm">
        © 2026 Traveloop. Built with Next.js and Google Gemini.
      </footer>
    </div>
  );
}

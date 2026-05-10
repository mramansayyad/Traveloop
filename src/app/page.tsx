import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, MapPin, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-cyan-700 rounded-full filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <main className="z-10 text-center max-w-4xl px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles size={16} className="text-cyan-400" />
          <span className="text-sm font-medium">Powered by Gemini 3</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          Your Next Adventure,{" "}
          <span className="text-gradient">AI-Engineered</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Traveloop uses advanced AI to craft personalized itineraries, discover hidden gems, and optimize your travel budget.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/dashboard" className="gradient-premium text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Start Planning <ArrowRight size={20} />
          </Link>
          <a href="#features" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
            Explore Features
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <Compass className="text-purple-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Smart Itineraries</h3>
            <p className="text-gray-400 text-sm">Day-wise plans optimized for your interests and pace.</p>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <MapPin className="text-cyan-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Hidden Gems</h3>
            <p className="text-gray-400 text-sm">Discover places tourists usually miss, curated by AI.</p>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <Calendar className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Seamless Scheduling</h3>
            <p className="text-gray-400 text-sm">Real-time collaboration and drag-and-drop timeline.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-gray-600 text-sm">
        © 2026 Traveloop. Built with Next.js and Google Gemini.
      </footer>
    </div>
  );
}


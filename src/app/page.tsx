import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, MapPin, Calendar, Brain, Shield, Zap, Star, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-50 rounded-full filter blur-3xl opacity-50"></div>

      {/* Header/Navbar */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Compass size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">Traveloop</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900">How it Works</a>
            <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</a>
          </div>
          <Link href="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm">
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-7xl w-full mx-auto px-6 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-full mb-8 shadow-sm">
          <Sparkles size={16} className="text-indigo-600" />
          <span className="text-sm font-medium text-slate-700">Powered by Gemini 3</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 text-center max-w-4xl">
          Your Next Adventure,{" "}
          <span className="text-indigo-600">AI-Engineered</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto text-center">
          Traveloop uses advanced AI to craft personalized itineraries, discover hidden gems, and optimize your travel budget.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
          <Link href="/dashboard" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm text-lg">
            Start Planning <ArrowRight size={20} />
          </Link>
          <a href="#features" className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-lg">
            Explore Features
          </a>
        </div>

        {/* Features Section */}
        <div id="features" className="w-full scroll-mt-24 mb-32">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Features</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Intelligence in Every Step</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">We have packed Traveloop with features that make travel planning effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                <Compass className="text-indigo-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Smart Itineraries</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Day-wise plans optimized for your interests, pace, and local opening hours. No more rigid templates.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Hidden Gems</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Discover places tourists usually miss. Our AI scans thousands of data points to find authentic experiences.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Seamless Scheduling</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Real-time collaboration and drag-and-drop timeline. Plan with friends and family without the stress.</p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div id="how-it-works" className="w-full scroll-mt-24 mb-32 bg-white rounded-3xl border border-slate-100 p-12 shadow-sm">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Process</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">How it Works</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Three simple steps to your dream vacation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl text-indigo-600 shadow-sm">1</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Share Your Vision</h3>
              <p className="text-slate-600 text-sm">Enter your destination, dates, and what you love doing.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white border-4 border-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl text-indigo-600 shadow-sm">2</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">AI Generation</h3>
              <p className="text-slate-600 text-sm">Gemini processes your inputs to craft a hyper-personalized plan.</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl text-white shadow-sm">3</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Refine & Go</h3>
              <p className="text-slate-600 text-sm">Adjust activities, invite friends, and start your journey.</p>
            </div>
          </div>
        </div>

        {/* Why Gemini Section */}
        <div className="w-full mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">AI Engine</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Why We Use Google Gemini</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <Brain className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Multimodal Understanding</h3>
                    <p className="text-sm text-slate-600 mt-1">Gemini understands the context of your request, not just keywords, leading to better recommendations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Blazing Fast Responses</h3>
                    <p className="text-sm text-slate-600 mt-1">Get your full 7-day itinerary in seconds, not minutes.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Secure & Reliable</h3>
                    <p className="text-sm text-slate-600 mt-1">Enterprise-grade security for your personal travel data.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 h-80 rounded-3xl flex items-center justify-center text-slate-400 font-medium border border-slate-200">
              [ Dashboard Screenshot Placeholder ]
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="w-full scroll-mt-24 mb-32 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Support</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is Traveloop free to use?", a: "Yes, during the hackathon phase, all features are completely free to use." },
              { q: "How accurate are the AI itineraries?", a: "Highly accurate! We use Gemini 3 which has access to the latest data and understands complex constraints." },
              { q: "Can I share my plan with friends?", a: "Absolutely. You can invite friends to view and edit your plans in real-time." },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="w-full bg-indigo-600 text-white rounded-3xl p-12 text-center mb-20 shadow-lg shadow-indigo-100">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Join thousands of travelers who are using AI to make their trips unforgettable.</p>
          <Link href="/dashboard" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm text-lg">
            Start Planning Now <ArrowRight size={20} />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-slate-500 text-sm border-t border-slate-100 bg-white">
        © 2026 Traveloop. Built with Next.js and Google Gemini.
      </footer>
    </div>
  );
}

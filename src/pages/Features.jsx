import React from "react";
import { Link } from "react-router-dom";
import {
  FiSearch, FiCalendar, FiUsers, FiShield, FiTrendingUp,
  FiBell, FiSmartphone, FiStar, FiArrowRight
} from "react-icons/fi";

const features = [
  {
    icon: FiSearch,
    title: "Smart Search & Filters",
    desc: "Find events by keyword, category, date, price, or location. Our intelligent search helps you discover exactly what you're looking for in seconds.",
    color: "blue",
  },
  {
    icon: FiCalendar,
    title: "Event Creation Wizard",
    desc: "Create professional events with our 3-step guided form. Add all details, set capacity, pricing, and publish to thousands of potential attendees.",
    color: "purple",
  },
  {
    icon: FiUsers,
    title: "One-Click Registration",
    desc: "Register for any event instantly. Your spot is saved automatically and you can manage all your registrations from your personal dashboard.",
    color: "pink",
  },
  {
    icon: FiShield,
    title: "Secure & Reliable",
    desc: "Your data is stored securely. No account required to browse — just create and discover events with confidence.",
    color: "green",
  },
  {
    icon: FiTrendingUp,
    title: "Live Availability Tracking",
    desc: "See real-time seat availability with visual progress bars. Know exactly how fast an event is filling up and secure your spot in time.",
    color: "yellow",
  },
  {
    icon: FiBell,
    title: "Categorized Discovery",
    desc: "Events organized into 6 categories: Technology, Music, Business, Arts, Sports, and Food. Filter by what matters to you.",
    color: "orange",
  },
  {
    icon: FiSmartphone,
    title: "Fully Responsive",
    desc: "EventHub works beautifully on desktop, tablet, and mobile. Browse and register from any device, any time.",
    color: "cyan",
  },
  {
    icon: FiStar,
    title: "My Events Dashboard",
    desc: "Keep track of all events you've registered for and created in one dedicated dashboard. Never miss an event you signed up for.",
    color: "indigo",
  },
];

const colorMap = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const Features = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <FiStar className="text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">What We Offer</span>
          </div>
          <h1 className="section-title">Powerful Features for<br />Events That Matter</h1>
          <p className="section-sub">
            Everything you need to discover events, connect with communities, and host unforgettable experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {features.map((f) => (
            <div key={f.title} className="card p-6 group hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${colorMap[f.color]}`}>
                <f.icon className="text-xl" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-10 md:p-14 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">How It Works</h2>
            <p className="text-gray-400">Get started in three simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Browse Events", desc: "Search and filter through hundreds of events across all categories and locations.", icon: FiSearch },
              { step: "02", title: "Register Instantly", desc: "Click register, secure your spot in one tap. No complicated sign-up flows.", icon: FiCalendar },
              { step: "03", title: "Attend & Enjoy", desc: "Show up, connect with people, and have an incredible experience.", icon: FiUsers },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="text-6xl font-black text-gray-800 mb-4">{item.step}</div>
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto -mt-8 mb-5 shadow-lg shadow-purple-500/25">
                  <item.icon className="text-white text-xl" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Join thousands of event-goers across Lebanon and beyond.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn-primary flex items-center justify-center gap-2">
              Explore Events <FiArrowRight />
            </Link>
            <Link to="/create" className="btn-outline">Create Your First Event</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

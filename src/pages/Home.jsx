import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCalendar, FiUsers, FiMapPin, FiStar, FiTrendingUp, FiShield } from "react-icons/fi";
import EventCard from "../components/EventCard";
import { events } from "../data/events";

const stats = [
  { label: "Events Hosted", value: "2,400+", icon: FiCalendar },
  { label: "Happy Attendees", value: "180K+", icon: FiUsers },
  { label: "Cities", value: "24", icon: FiMapPin },
  { label: "5-Star Reviews", value: "98%", icon: FiStar },
];

const features = [
  {
    icon: FiCalendar,
    title: "Easy Event Discovery",
    desc: "Browse events by category, date, or location. Find exactly what excites you.",
  },
  {
    icon: FiTrendingUp,
    title: "One-Click Registration",
    desc: "Register for events instantly. Your spot is saved and confirmed in seconds.",
  },
  {
    icon: FiShield,
    title: "Create & Manage",
    desc: "Host your own events with our intuitive creation tools. Reach thousands.",
  },
];

const Home = () => {
  const featured = events.slice(0, 3);
  const upcoming = events.slice(3, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-950">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-950 to-gray-950" />
          {/* Animated blobs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Events happening near you</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Discover & Create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Amazing Events
            </span>
          </h1>

          <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Find local events that match your interests, or host your own and bring people together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/events" className="btn-primary flex items-center justify-center gap-2 text-lg py-3.5 px-8">
              Explore Events <FiArrowRight />
            </Link>
            <Link to="/create" className="btn-outline flex items-center justify-center gap-2 text-lg py-3.5 px-8">
              Create an Event
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
                <s.icon className="text-purple-400 text-2xl mx-auto mb-2" />
                <div className="text-white text-2xl font-black">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-purple-400 font-semibold mb-2">🔥 Hot Right Now</p>
            <h2 className="section-title mb-0">Featured Events</h2>
          </div>
          <Link to="/events" className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
            View all <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link to="/events" className="btn-outline">View All Events</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-400 font-semibold mb-2">Why EventHub?</p>
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-sub">A complete platform to explore, register, and host events seamlessly.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-8 text-center">
                <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <f.icon className="text-purple-400 text-2xl" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-purple-400 font-semibold mb-2">📅 Coming Soon</p>
            <h2 className="section-title mb-0">Upcoming Events</h2>
          </div>
          <Link to="/events" className="hidden sm:flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
            See all <FiArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative bg-gradient-to-r from-purple-900/60 to-pink-900/40 border border-purple-500/20 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Ready to Host Your Event?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              It takes less than 2 minutes to create an event and start reaching your audience.
            </p>
            <Link to="/create" className="btn-primary text-lg py-3.5 px-10 inline-flex items-center gap-2">
              Get Started Free <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTarget, FiGlobe, FiArrowRight, FiCode, FiLayout, FiDatabase } from "react-icons/fi";

const team = [
  { name: "Wissam", role: "Lead Developer & Designer", initials: "W", color: "bg-purple-600" },
  { name: "Frontend Team", role: "React & Tailwind CSS", initials: "FT", color: "bg-blue-600" },
  { name: "UX Team", role: "User Experience & Design", initials: "UX", color: "bg-pink-600" },
];

const techStack = [
  { icon: FiCode, name: "React 18", desc: "Component-based UI library" },
  { icon: FiLayout, name: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: FiDatabase, name: "React Router v6", desc: "Client-side navigation" },
  { icon: FiGlobe, name: "Vercel", desc: "Deployment & hosting" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <FiHeart className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            About <span className="text-purple-400">EventHub</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            We believe every great memory starts with an event. EventHub is your platform to discover,
            create, and experience events that matter to you.
          </p>
        </div>

        {/* Mission cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: FiTarget,
              title: "Our Mission",
              desc: "To make event discovery and creation effortless for everyone — from local meetups to large-scale conferences. We connect communities through shared experiences.",
              color: "purple",
            },
            {
              icon: FiHeart,
              title: "Our Values",
              desc: "Community-first design. We build for people who want to connect, learn, and celebrate together. Accessibility and simplicity are non-negotiable.",
              color: "pink",
            },
            {
              icon: FiGlobe,
              title: "Our Vision",
              desc: "To become the go-to platform for events across Lebanon and the Arab world — where every organizer can reach their audience and every person can find their tribe.",
              color: "blue",
            },
          ].map((item) => (
            <div key={item.title} className="card p-8">
              <div className={`w-12 h-12 ${
                item.color === "purple" ? "bg-purple-500/10" :
                item.color === "pink" ? "bg-pink-500/10" : "bg-blue-500/10"
              } rounded-2xl flex items-center justify-center mb-5`}>
                <item.icon className={`text-xl ${
                  item.color === "purple" ? "text-purple-400" :
                  item.color === "pink" ? "text-pink-400" : "text-blue-400"
                }`} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 md:p-14 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-6">Our Story</h2>
            <div className="space-y-5 text-gray-400 leading-relaxed text-lg">
              <p>
                EventHub started as a university project with a simple observation: finding events in Beirut
                was scattered across dozens of Instagram pages, WhatsApp groups, and word-of-mouth.
                There had to be a better way.
              </p>
              <p>
                Built using modern web technologies — React, Tailwind CSS, and React Router — EventHub
                is a fully responsive, frontend-only application that demonstrates how powerful a
                well-designed single-page app can be without any backend infrastructure.
              </p>
              <p>
                What started as an academic exercise grew into a fully functional prototype that could
                realistically serve as the foundation for a production-ready event management platform.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {techStack.map((t) => (
              <div key={t.name} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                <t.icon className="text-purple-400 text-3xl mx-auto mb-3" />
                <h4 className="text-white font-bold mb-1">{t.name}</h4>
                <p className="text-gray-500 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-8 text-center">
                <div className={`w-16 h-16 ${member.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <span className="text-white font-black text-xl">{member.initials}</span>
                </div>
                <h4 className="text-white font-bold text-lg">{member.name}</h4>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Join the Community</h2>
          <p className="text-gray-400 mb-8">Start discovering events or create your own today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn-primary flex items-center justify-center gap-2">
              Explore Events <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline">Get in Touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

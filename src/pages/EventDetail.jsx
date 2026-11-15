import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiCalendar, FiMapPin, FiUsers, FiClock, FiArrowLeft,
  FiShare2, FiTag, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { getEventById, getCategoryColor, events } from "../data/events";
import { useApp } from "../context/AppContext";
import EventCard from "../components/EventCard";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { registerForEvent, unregisterFromEvent, isRegistered, userEvents } = useApp();
  const [showModal, setShowModal] = useState(false);

  const event = getEventById(id) || userEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-white text-2xl font-bold mb-2">Event Not Found</h2>
          <p className="text-gray-400 mb-6">This event may have been removed or doesn't exist.</p>
          <Link to="/events" className="btn-primary">Browse Events</Link>
        </div>
      </div>
    );
  }

  const registered = isRegistered(event.id);
  const spotsLeft = event.seats - event.registered;
  const fillPercent = Math.round((event.registered / event.seats) * 100);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  };

  const handleRegister = () => {
    if (registered) {
      unregisterFromEvent(event.id);
    } else {
      registerForEvent(event.id, event.title);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2500);
    }
  };

  const related = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/1200x400/1a1a2e/a855f7?text=${encodeURIComponent(event.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-white rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <span className={`badge mb-4 ${getCategoryColor(event.category)}`}>{event.category}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-6">{event.title}</h1>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: FiCalendar, label: "Date", value: formatDate(event.date) },
                { icon: FiClock, label: "Time", value: event.time },
                { icon: FiMapPin, label: "Location", value: event.location },
                { icon: FiUsers, label: "Capacity", value: `${event.registered} / ${event.seats} registered` },
              ].map((item) => (
                <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-9 h-9 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <h2 className="text-white font-bold text-xl mb-4">About this Event</h2>
              <p className="text-gray-400 leading-relaxed">{event.description}</p>
            </div>

            {/* Organizer */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <h2 className="text-white font-bold text-xl mb-4">Organizer</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {event.organizer?.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{event.organizer}</p>
                  <p className="text-gray-400 text-sm">Event Organizer</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <FiTag /> Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm border border-gray-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-black text-white mb-1">
                  {event.price === 0 ? (
                    <span className="text-green-400">Free</span>
                  ) : (
                    <>${event.price}</>
                  )}
                </div>
                {event.price > 0 && <p className="text-gray-500 text-sm">per person</p>}
              </div>

              {/* Capacity bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{event.registered} registered</span>
                  <span className={spotsLeft < 20 ? "text-red-400 font-semibold" : "text-green-400"}>
                    {spotsLeft} spots left
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${fillPercent > 85 ? "bg-red-500" : fillPercent > 60 ? "bg-yellow-500" : "bg-purple-500"}`}
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1.5">{fillPercent}% filled</p>
              </div>

              {/* Register button */}
              <button
                onClick={handleRegister}
                disabled={!registered && spotsLeft === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${
                  registered
                    ? "bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-red-600/20 hover:border-red-500/30 hover:text-red-400"
                    : spotsLeft === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-lg hover:shadow-purple-500/25"
                }`}
              >
                {registered ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiCheckCircle /> Registered — Cancel?
                  </span>
                ) : spotsLeft === 0 ? (
                  "Event Full"
                ) : (
                  `Register Now`
                )}
              </button>

              {registered && (
                <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-2">
                  <FiCheckCircle className="text-green-400 flex-shrink-0" />
                  <p className="text-green-400 text-sm">You're registered for this event!</p>
                </div>
              )}

              <button className="w-full mt-3 py-3 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors font-medium flex items-center justify-center gap-2">
                <FiShare2 /> Share Event
              </button>

              {spotsLeft < 30 && spotsLeft > 0 && !registered && (
                <div className="mt-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2">
                  <FiAlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-400 text-xs">Only {spotsLeft} spots remaining! Register soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-white text-2xl font-bold mb-6">More {event.category} Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-green-500/30 rounded-3xl p-10 text-center max-w-sm w-full animate-bounce-in">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheckCircle className="text-green-400 text-4xl" />
            </div>
            <h3 className="text-white text-2xl font-black mb-2">You're In! 🎉</h3>
            <p className="text-gray-400">Successfully registered for <strong className="text-white">{event.title}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;

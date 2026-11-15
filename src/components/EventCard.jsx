import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers, FiClock } from "react-icons/fi";
import { getCategoryColor } from "../data/events";
import { useApp } from "../context/AppContext";

const EventCard = ({ event }) => {
  const { isRegistered } = useApp();
  const registered = isRegistered(event.id);
  const spotsLeft = event.seats - event.registered;
  const fillPercent = Math.round((event.registered / event.seats) * 100);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <Link to={`/events/${event.id}`} className="card block group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/800x400/1a1a2e/a855f7?text=${encodeURIComponent(event.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        {/* Category badge */}
        <span className={`badge absolute top-3 left-3 ${getCategoryColor(event.category)}`}>
          {event.category}
        </span>

        {/* Price badge */}
        <span className="absolute top-3 right-3 bg-gray-900/90 text-white text-sm font-bold px-3 py-1 rounded-full">
          {event.price === 0 ? "Free" : `$${event.price}`}
        </span>

        {registered && (
          <span className="absolute bottom-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ✓ Registered
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-3 group-hover:text-purple-400 transition-colors line-clamp-1">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FiCalendar className="text-purple-400 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
            <FiClock className="text-purple-400 ml-1 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FiMapPin className="text-purple-400 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        {/* Seats progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <FiUsers className="text-purple-400" />
              <span>{event.registered} / {event.seats} registered</span>
            </div>
            <span className={`text-xs font-semibold ${spotsLeft < 20 ? "text-red-400" : "text-green-400"}`}>
              {spotsLeft} left
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${
                fillPercent > 85 ? "bg-red-500" : fillPercent > 60 ? "bg-yellow-500" : "bg-purple-500"
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiPlus } from "react-icons/fi";
import EventCard from "../components/EventCard";
import { events } from "../data/events";
import { useApp } from "../context/AppContext";

const MyEvents = () => {
  const { registrations, userEvents } = useApp();
  const registeredEvents = events.filter((e) => registrations.includes(e.id));

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">My Events</h1>
          <p className="text-gray-400">Events you've registered for and created.</p>
        </div>

        {/* Registered */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FiCalendar className="text-purple-400" /> Registered Events
            <span className="ml-2 bg-purple-500/20 text-purple-400 text-sm px-2 py-0.5 rounded-full">{registeredEvents.length}</span>
          </h2>
          {registeredEvents.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-white text-xl font-bold mb-2">No registrations yet</h3>
              <p className="text-gray-400 mb-6">Browse events and register to see them here.</p>
              <Link to="/events" className="btn-primary">Browse Events</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </section>

        {/* Created */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FiPlus className="text-purple-400" /> Events I Created
            <span className="ml-2 bg-purple-500/20 text-purple-400 text-sm px-2 py-0.5 rounded-full">{userEvents.length}</span>
          </h2>
          {userEvents.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-4">🎪</div>
              <h3 className="text-white text-xl font-bold mb-2">No events created yet</h3>
              <p className="text-gray-400 mb-6">Create your first event and reach thousands of people.</p>
              <Link to="/create" className="btn-primary">Create Event</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.map((e) => <EventCard key={e.id} event={e} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyEvents;

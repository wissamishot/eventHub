import React, { useState, useMemo } from "react";
import { FiSearch, FiFilter, FiGrid, FiList } from "react-icons/fi";
import EventCard from "../components/EventCard";
import { events, categories } from "../data/events";
import { useApp } from "../context/AppContext";

const Events = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [view, setView] = useState("grid");
  const { userEvents } = useApp();

  const allEvents = useMemo(() => [...events, ...userEvents], [userEvents]);

  const filtered = useMemo(() => {
    let result = allEvents;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "All") {
      result = result.filter((e) => e.category === category);
    }

    if (priceFilter === "free") result = result.filter((e) => e.price === 0);
    else if (priceFilter === "paid") result = result.filter((e) => e.price > 0);

    result = [...result].sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "popular") return b.registered - a.registered;
      return 0;
    });

    return result;
  }, [allEvents, search, category, priceFilter, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Browse Events</h1>
          <p className="text-gray-400 text-lg">{filtered.length} events found</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search events, locations, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-11"
              />
            </div>

            {/* Price */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="input md:w-36"
            >
              <option value="all">All Prices</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input md:w-40"
            >
              <option value="date">By Date</option>
              <option value="price">By Price</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View toggle */}
            <div className="flex gap-1 bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 rounded-lg transition-colors ${view === "grid" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 rounded-lg transition-colors ${view === "list" ? "bg-purple-600 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <FiList />
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white text-2xl font-bold mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); setPriceFilter("all"); }}
              className="btn-outline mt-6"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

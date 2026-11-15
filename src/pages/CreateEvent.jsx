import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiImage, FiTag, FiInfo } from "react-icons/fi";
import { categories } from "../data/events";
import { useApp } from "../context/AppContext";

const initialForm = {
  title: "",
  category: "Technology",
  date: "",
  time: "09:00",
  location: "",
  price: "",
  seats: "",
  description: "",
  organizer: "",
  image: "",
  tags: "",
};

const CreateEvent = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { addUserEvent } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (fields) => {
    const errs = {};
    if (step === 1 || fields === "all") {
      if (!form.title.trim()) errs.title = "Event title is required";
      if (!form.category) errs.category = "Category is required";
      if (!form.date) errs.date = "Date is required";
      if (!form.time) errs.time = "Time is required";
    }
    if (step === 2 || fields === "all") {
      if (!form.location.trim()) errs.location = "Location is required";
      if (!form.organizer.trim()) errs.organizer = "Organizer name is required";
      if (!form.seats || isNaN(form.seats) || parseInt(form.seats) < 1)
        errs.seats = "Valid seat count required";
      if (form.price !== "" && (isNaN(form.price) || parseFloat(form.price) < 0))
        errs.price = "Price must be a positive number";
    }
    if (step === 3 || fields === "all") {
      if (!form.description.trim() || form.description.length < 20)
        errs.description = "Description must be at least 20 characters";
    }
    return errs;
  };

  const nextStep = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep((s) => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate("all");
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    setTimeout(() => {
      const newEvent = addUserEvent({
        ...form,
        price: parseFloat(form.price) || 0,
        seats: parseInt(form.seats),
        registered: 0,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        image: form.image || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80`,
      });
      setSubmitting(false);
      navigate(`/events`);
    }, 800);
  };

  const steps = ["Basic Info", "Details", "Description"];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Create Event</h1>
          <p className="text-gray-400">Fill in the details to publish your event.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i + 1 < step
                      ? "bg-green-600 text-white"
                      : i + 1 === step
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    i + 1 === step ? "text-white" : "text-gray-500"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px transition-colors ${i + 1 < step ? "bg-green-600" : "bg-gray-800"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-7 space-y-6">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Title *</label>
                <input name="title" value={form.title} onChange={handleChange} className="input" placeholder="e.g. TechConf 2027" />
                {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="input">
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FiCalendar className="inline mr-1" /> Date *
                  </label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
                  {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                  <input type="time" name="time" value={form.time} onChange={handleChange} className="input" />
                  {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time}</p>}
                </div>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiMapPin className="inline mr-1" /> Location *
                </label>
                <input name="location" value={form.location} onChange={handleChange} className="input" placeholder="e.g. Beirut Digital District, Beirut" />
                {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Organizer Name *</label>
                <input name="organizer" value={form.organizer} onChange={handleChange} className="input" placeholder="Your name or organization" />
                {errors.organizer && <p className="text-red-400 text-sm mt-1">{errors.organizer}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FiUsers className="inline mr-1" /> Total Seats *
                  </label>
                  <input type="number" name="seats" value={form.seats} onChange={handleChange} className="input" placeholder="e.g. 200" min="1" />
                  {errors.seats && <p className="text-red-400 text-sm mt-1">{errors.seats}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <FiDollarSign className="inline mr-1" /> Price ($ / 0 = free)
                  </label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} className="input" placeholder="0" min="0" step="0.01" />
                  {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiImage className="inline mr-1" /> Image URL (optional)
                </label>
                <input name="image" value={form.image} onChange={handleChange} className="input" placeholder="https://..." />
              </div>
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiInfo className="inline mr-1" /> Event Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="input min-h-[150px] resize-y"
                  placeholder="Describe your event in detail. What will attendees experience?"
                />
                <div className="flex justify-between mt-1">
                  {errors.description && <p className="text-red-400 text-sm">{errors.description}</p>}
                  <p className="text-gray-600 text-xs ml-auto">{form.description.length} chars</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <FiTag className="inline mr-1" /> Tags (comma-separated)
                </label>
                <input name="tags" value={form.tags} onChange={handleChange} className="input" placeholder="e.g. Networking, Workshop, Free" />
              </div>

              {/* Preview */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Preview Summary</p>
                <p className="text-white font-bold text-lg">{form.title || "—"}</p>
                <p className="text-gray-400 text-sm">{form.category} · {form.date} · {form.time}</p>
                <p className="text-gray-400 text-sm">{form.location}</p>
                <p className="text-purple-400 text-sm font-semibold mt-1">
                  {form.price === "" || form.price === "0" ? "Free" : `$${form.price}`} · {form.seats} seats
                </p>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-800">
            {step > 1 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="btn-outline">
                ← Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Continue →
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2">
                {submitting ? "Creating..." : "🚀 Publish Event"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

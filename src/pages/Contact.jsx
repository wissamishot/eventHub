import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle, FiMessageSquare, FiClock } from "react-icons/fi";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.subject.trim()) errs.subject = "Subject is required";
    if (!form.message.trim() || form.message.length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const contactInfo = [
    { icon: FiMail, label: "Email", value: "support@eventhub.lb", link: "mailto:support@eventhub.lb" },
    { icon: FiPhone, label: "Phone", value: "+961 1 234 567", link: "tel:+9611234567" },
    { icon: FiMapPin, label: "Address", value: "Beirut Digital District, Beirut, Lebanon" },
    { icon: FiClock, label: "Support Hours", value: "Mon–Fri, 9:00 AM – 6:00 PM (AST)" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <FiMessageSquare className="text-purple-400 text-2xl" />
          </div>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-sub">
            Have a question, feedback, or want to partner with us? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} className="text-white text-sm font-medium hover:text-purple-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* FAQ quick links */}
            <div className="card p-6">
              <h3 className="text-white font-bold mb-4">Common Questions</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="hover:text-purple-400 cursor-pointer transition-colors">→ How do I cancel my registration?</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">→ Can I edit my event after publishing?</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">→ How are free events verified?</li>
                <li className="hover:text-purple-400 cursor-pointer transition-colors">→ Is there a mobile app?</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <FiCheckCircle className="text-green-400 text-4xl" />
                  </div>
                  <h3 className="text-white text-2xl font-black mb-2">Message Sent! 🎉</h3>
                  <p className="text-gray-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-outline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-white text-xl font-bold mb-6">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} className="input" placeholder="John Doe" />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} className="input" placeholder="you@example.com" />
                      {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="input">
                      <option value="">Select a topic...</option>
                      <option value="general">General Inquiry</option>
                      <option value="event">Event Support</option>
                      <option value="bug">Report a Bug</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="input min-h-[140px] resize-y"
                      placeholder="Tell us how we can help..."
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message && <p className="text-red-400 text-sm">{errors.message}</p>}
                      <p className="text-gray-600 text-xs ml-auto">{form.message.length} chars</p>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                    {loading ? (
                      <><span className="animate-spin">⏳</span> Sending...</>
                    ) : (
                      <><FiSend /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

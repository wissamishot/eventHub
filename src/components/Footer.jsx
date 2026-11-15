import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiGithub, FiTwitter, FiInstagram, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center">
                <FiCalendar className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">
                Event<span className="text-purple-400">Hub</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover, create, and manage events that bring people together.
            </p>
            <div className="flex gap-3 mt-5">
              {[FiGithub, FiTwitter, FiInstagram, FiMail].map((Icon, i) => (
                <a
                  key={i}
                  href="!#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Browse Events", to: "/events" },
                { label: "Create Event", to: "/create" },
                { label: "My Events", to: "/my-events" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", to: "/about" },
                { label: "Features", to: "/features" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-gray-500 hover:text-purple-400 text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2.5 text-gray-500 text-sm">
              <li>Beirut, Lebanon</li>
              <li>support@eventhub.lb</li>
              <li>+961 1 234 567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-600 text-sm">© 2026 EventHub. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

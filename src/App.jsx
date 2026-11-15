import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center pt-16 text-center px-4">
    <div>
      <div className="text-8xl font-black text-gray-800 mb-4">404</div>
      <h2 className="text-white text-3xl font-black mb-3">Page Not Found</h2>
      <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn-primary inline-flex items-center gap-2">Go Home</a>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-gray-950">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Notification />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

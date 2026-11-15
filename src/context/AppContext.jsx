import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventhub_registrations")) || [];
    } catch {
      return [];
    }
  });

  const [userEvents, setUserEvents] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventhub_user_events")) || [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem("eventhub_registrations", JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem("eventhub_user_events", JSON.stringify(userEvents));
  }, [userEvents]);

  const registerForEvent = (eventId, eventTitle) => {
    if (registrations.includes(eventId)) return false;
    setRegistrations((prev) => [...prev, eventId]);
    showNotification(`✅ Registered for "${eventTitle}" successfully!`, "success");
    return true;
  };

  const unregisterFromEvent = (eventId) => {
    setRegistrations((prev) => prev.filter((id) => id !== eventId));
    showNotification("Unregistered from event.", "info");
  };

  const isRegistered = (eventId) => registrations.includes(eventId);

  const addUserEvent = (event) => {
    const newEvent = { ...event, id: Date.now(), userCreated: true };
    setUserEvents((prev) => [...prev, newEvent]);
    showNotification(`🎉 Event "${event.title}" created successfully!`, "success");
    return newEvent;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <AppContext.Provider
      value={{
        registrations,
        userEvents,
        registerForEvent,
        unregisterFromEvent,
        isRegistered,
        addUserEvent,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

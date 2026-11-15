import React from "react";
import { useApp } from "../context/AppContext";
import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

const Notification = () => {
  const { notification } = useApp();

  if (!notification) return null;

  const icons = {
    success: <FiCheckCircle className="text-green-400 text-xl flex-shrink-0" />,
    info: <FiInfo className="text-blue-400 text-xl flex-shrink-0" />,
    error: <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />,
  };

  const borders = {
    success: "border-green-500/30",
    info: "border-blue-500/30",
    error: "border-red-500/30",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div
        className={`bg-gray-900 border ${borders[notification.type]} rounded-xl px-5 py-4 flex items-center gap-3 shadow-2xl max-w-sm`}
      >
        {icons[notification.type]}
        <p className="text-white text-sm font-medium">{notification.message}</p>
      </div>
    </div>
  );
};

export default Notification;

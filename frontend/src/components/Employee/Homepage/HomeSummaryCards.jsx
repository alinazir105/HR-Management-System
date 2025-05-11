import React from "react";
import {
  CalendarDays,
  PercentCircle,
  AlarmClock,
  Plane,
  Briefcase,
  Star,
} from "lucide-react";

const typeStyles = {
  payroll: {
    icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
    border: "border-blue-100",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  attendance: {
    icon: <PercentCircle className="w-6 h-6 text-green-500" />,
    border: "border-green-100",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  leave: {
    icon: <AlarmClock className="w-6 h-6 text-orange-500" />,
    border: "border-orange-100",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  leavesReaming: {
    icon: <Plane className="w-6 h-6 text-red-500" />,
    border: "border-red-100",
    bg: "bg-red-50",
    text: "text-red-700",
  },
  performance: {
    icon: <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />,
    border: "border-yellow-100",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  default: {
    icon: <Briefcase className="w-6 h-6 text-gray-400" />,
    border: "border-neutral-100",
    bg: "bg-white",
    text: "text-gray-800",
  },
};

const HomeSummaryCards = ({ title, text, tooltip = "", type = "default" }) => {
  const style = typeStyles[type] || typeStyles.default;

  return (
    <div
      className={`flex-1 p-6 rounded-2xl shadow-md text-center border ${style.border} ${style.bg} transition hover:shadow-lg`}
    >
      <div className="flex justify-center items-center mb-2">{style.icon}</div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div
        className={`text-xl font-semibold cursor-pointer ${style.text}`}
        title={tooltip}
      >
        {text}
      </div>
    </div>
  );
};

export default HomeSummaryCards;

import React from "react";
import { Link } from "react-router-dom";

const colorClasses = {
  yellow: { base: "bg-yellow-400", hover: "hover:bg-yellow-500" },
  blue: { base: "bg-blue-400", hover: "hover:bg-blue-500" },
  green: { base: "bg-green-400", hover: "hover:bg-green-500" },
  gray: { base: "bg-gray-400", hover: "hover:bg-gray-500" },
};

const SummaryCard = ({ to, logo: Logo, number, text, bgColor }) => {
  const bgClass = colorClasses[bgColor]?.base || "bg-gray-400";
  const hoverClass = colorClasses[bgColor]?.hover || "hover:bg-gray-500";

  return (
    <Link to={to}>
      <div
        className={`flex gap-6 shadow-md p-6 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 
          ${bgClass} ${hoverClass} transition-all duration-300`}
      >
        <div className="hidden md:block">
          <Logo height={60} width={60} />
        </div>
        <div className="text-center md:text-left flex flex-col">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {number}
          </h5>
          <p className="mb-2 font-semibold text-Black">{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default SummaryCard;

import React from "react";
import { Link } from "react-router-dom";

const SummaryCard = ({ to, logo: Logo, number, text }) => {
  return (
    <Link to={to}>
      <div
        className="flex w-full overflow-hidden gap-6 px-6 py-4 shadow-lg rounded-xl justify-center lg:justify-start items-center border border-neutral-200 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 h-full"
      >
        <div className="hidden lg:block text-neutral-800 dark:text-neutral-600">
          <Logo height={45} width={45} />
        </div>
        <div>
          <div className="text-center lg:text-left flex flex-col">
            <h5 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
              {number}
            </h5>
            <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {text}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SummaryCard;

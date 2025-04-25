import React from "react";
import { Link } from "react-router-dom";

const SummaryCard = ({ to, logo: Logo, number, text }) => {
  return (
    <Link to={to}>
      <div
        className={`flex flex-1 overflow-hidden gap-4 px-6 shadow-md justify-start items-center border border-black rounded-lg dark:bg-gray-800 dark:border-gray-700 
          bg-neutral-100 hover:bg-neutral-300 transition-all duration-300 h-[6rem]`}
      >
        <div className="hidden lg:block">
          <Logo height={50} width={50} />
        </div>
        <div className="mt-2">
          <div className="text-center md:text-left flex flex-col">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {number}
            </h5>
            <p className="mb-2 font-semibold text-Black">{text}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SummaryCard;

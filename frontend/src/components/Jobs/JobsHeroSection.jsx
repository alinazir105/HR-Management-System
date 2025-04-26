import React from "react";

const JobsHeroSection = () => {
  return (
    <>
      <div className="relative">
        <div>
          <img
            className="h-60 w-full object-cover"
            src="/jobsBgImage.jpg"
            alt=""
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-blue-900/40">
          <h1 className="text-4xl font-bold text-white text-center">
            Join Our Team
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobsHeroSection;

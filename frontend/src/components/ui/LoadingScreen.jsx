import React from "react";

const LoadingScreen = ({ message }) => {
  return (
    <div className="absolute inset-0 bg-gray-950 opacity-70 flex justify-center items-center z-50">
      <div className="text-white text-lg flex items-center gap-3 mb-2">
        <Loader2 className="animate-spin" />
        <div>{message || ""}</div>
      </div>
    </div>
  );
};

export default LoadingScreen;

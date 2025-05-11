import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Button
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={() => navigate("/login")}
            >
                Go to Login
            </Button>
        </div>
    );
};

export default Error404;

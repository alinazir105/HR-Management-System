import { Bell, CheckCircle } from "lucide-react";
import React from "react";

const TodaysStats = () => {
  return (
    <>
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome, <span className="italic font-bold">Ayyan</span>!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Attendance Status Card */}
          <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center gap-4 border-t-4 border-green-500">
            <CheckCircle className="text-green-600 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Attendance
              </h3>
              <p className="text-sm text-gray-600">You're checked in 🎉</p>
            </div>
          </div>

          {/* Notification Card */}
          <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center gap-4 border-t-4 border-yellow-500">
            <Bell className="text-yellow-500 w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Notifications
              </h3>
              <p className="text-sm text-gray-600">
                You have 5 unread alerts 🔔
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysStats;

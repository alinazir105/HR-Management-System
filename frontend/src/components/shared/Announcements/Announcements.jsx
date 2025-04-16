import React from "react";
import AnnouncementsHeader from "./AnnouncementsHeader";
import AnnouncementCard from "./AnnouncementCard";

const Announcements = () => {
  return (
    <div className="ml-10 mt-2 mr-8 mb-5">
      <AnnouncementsHeader />
      <div className="mt-5 flex flex-col gap-3">
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  );
};

export default Announcements;

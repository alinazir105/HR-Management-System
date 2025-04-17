import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, CircleAlert, Ellipsis, ShieldAlert } from "lucide-react";
import AnnouncementsDelete from "./AnnouncementsDelete";
import { useSession } from "@/contexts/Session/SessionContext";

const AnnouncementCard = ({ data, setRefreshData, setIsDeleting }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ellipsisDropdown, setEllipsisDropdown] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);
  const shadowRef = useRef(null);

  const { sessionData } = useSession();

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  const toggleEllipsisDropdown = (e) => {
    e.stopPropagation();
    setEllipsisDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (!ellipsisDropdown) return;
      setEllipsisDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ellipsisDropdown]);

  useEffect(() => {
    const el = descriptionRef.current;
    const shadowEl = shadowRef.current;
    if (el && shadowEl) {
      const clampHeight = el.clientHeight;
      const fullHeight = shadowEl.clientHeight;
      setIsOverflowing(fullHeight > clampHeight + 1);
    }
  }, [data.description]);

  const renderIcon = () => {
    switch (data.type) {
      case "General":
        return <ShieldAlert className="w-[1.4em] h-[1.4em]" />;
      case "Urgent":
        return <CircleAlert className="w-[1.4em] h-[1.4em]" />;
      case "Event":
        return <Calendar className="w-[1.4em] h-[1.4em]" />;
      default:
        return <ShieldAlert className="w-[1.4em] h-[1.4em]" />;
    }
  };

  const formattedDate = new Date(data.posted_at).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="p-4 pb-5 shadow-sm rounded-lg border border-neutral-300 relative">
      <div className="flex gap-5 justify-between items-center">
        <Badge
          className={`text-white font-semibold ${data.type === "General"
            ? "bg-blue-600"
            : data.type === "Urgent"
              ? "bg-red-700"
              : data.type === "Event"
                ? "bg-green-700"
                : "bg-gray-600"
            }`}
        >
          {data.type}
        </Badge>

        {sessionData.role === "hr" && (
          <div className="relative" onClick={toggleEllipsisDropdown}>
            <div className="hover:bg-gray-200 hover:rounded-full p-1 cursor-pointer">
              <Ellipsis />
            </div>
            {ellipsisDropdown && (
              <div className="absolute right-0" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white shadow-md rounded-xl">
                  <AnnouncementsDelete
                    id={data.id}
                    setRefreshData={setRefreshData}
                    setIsDeleting={setIsDeleting}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2 items-center">
        {renderIcon()}
        <h2 className="font-semibold text-lg">{data.title}</h2>
      </div>

      <div className="mt-2 relative">
        <p
          ref={descriptionRef}
          className={`text-sm text-neutral-700 transition-all duration-200 ${!isExpanded ? "line-clamp-2" : ""
            }`}
        >
          {data.description}
        </p>

        {/* Hidden shadow element for measuring full height */}
        <p
          ref={shadowRef}
          className="invisible absolute top-0 left-0 w-full text-sm"
        >
          {data.description}
        </p>

        {isOverflowing && (
          <button
            onClick={toggleReadMore}
            className="mt-1 text-sm text-blue-600 hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-sm text-muted-foreground">
          {sessionData.role === "hr" ? "Posted by You" : "Posted by HR"}
          <span> on {formattedDate}</span>
        </h3>
      </div>
    </div>
  );
};

export default AnnouncementCard;

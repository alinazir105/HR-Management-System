import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Ellipsis, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnnouncementsDelete from "./AnnouncementsDelete";
import { useSession } from "@/contexts/Session/SessionContext";

const AnnouncementCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ellipsisDropdown, setEllipsisDropdown] = useState(false);
  const { sessionData } = useSession();

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

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

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ellipsisDropdown]);

  return (
    <div className="p-4 pb-5 shadow-sm rounded-lg border border-neutral-300">
      <div className="flex gap-5 justify-between items-center">
        <Badge className="bg-blue-600">Urgent</Badge>

        {/* Only For HR */}
        {sessionData.role == "hr" && (
          <div className="relative">
            <div className="hover:bg-gray-200 hover:rounded-[50%] p-1 cursor-pointer">
              <Ellipsis onClick={toggleEllipsisDropdown} />
            </div>
            {ellipsisDropdown && (
              <div
                className="absolute right-0 "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white shadow-md rounded-xl">
                  <AnnouncementsDelete />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2 items-center">
        <ShieldAlert className="w-[1.4em] h-[1.4em]" />
        <h2 className="font-semibold text-lg">Lorem ipsum dolor sit amet</h2>
      </div>

      <div className="mt-2">
        <p
          className={`text-sm text-neutral-700 ${
            !isExpanded ? "line-clamp-2" : ""
          }`}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          voluptatibus similique placeat alias ducimus deleniti repudiandae
          voluptatum, harum amet ab, itaque obcaecati magnam optio dolorum nemo!
          Pariatur, accusamus? Saepe, earum!
        </p>
        <button
          onClick={toggleReadMore}
          className="mt-1 text-sm text-blue-600 hover:underline"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      </div>
      <div className="mt-5">
        <h3 className="text-sm text-muted-foreground">
          {sessionData.role == "hr" ? "Posted by You" : "Posted by HR"}
          <span> on 16th April, 2025</span>
        </h3>
      </div>
    </div>
  );
};

export default AnnouncementCard;

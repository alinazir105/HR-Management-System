import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/Session/SessionContext";
import React, { } from "react";
import AnnouncementsDialog from "./AnnouncementsDialog";
import LoadingScreen from "@/components/ui/LoadingScreen";

const AnnouncementsHeader = ({ setRefreshData, setIsAdding }) => {
  const { sessionData } = useSession();

  return (
    <div>
      <div className="flex justify-between gap-5 flex-wrap mt-4">
        <h1 className="text-3xl font-bold">Annoucements</h1>
        {sessionData.role == "hr" && <div>
          <AnnouncementsDialog setRefreshData={setRefreshData} setIsAdding={setIsAdding} />
        </div>}

      </div>
    </div>
  );
};

export default AnnouncementsHeader;

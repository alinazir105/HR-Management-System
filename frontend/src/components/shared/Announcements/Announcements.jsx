import React, { useEffect, useState } from "react";
import AnnouncementsHeader from "./AnnouncementsHeader";
import AnnouncementCard from "./AnnouncementCard";
import api from "@/lib/api";
import { toast } from "sonner";
import LoadingScreen from "@/components/ui/LoadingScreen";

const Announcements = () => {
  const [allAnnouncements, setAllAnnouncements] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const [isFetchingAnnouncements, setIsFetchingAnnouncements] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)


  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsFetchingAnnouncements(true)
      try {
        const response = await api.get("/announcements/all", { withCredentials: true })
        setAllAnnouncements(response.data.announcements)

      } catch (e) {
        console.error(e);
        toast.error("Error while fetching announcements!")
      }
      finally {
        setIsFetchingAnnouncements(false)
        setRefreshData(false)
      }
    }
    fetchAnnouncements()
  }, [refreshData])

  if (isFetchingAnnouncements) {
    return <LoadingScreen />
  }

  if (isAdding) {
    return <LoadingScreen />
  }

  if (isDeleting) {
    return <LoadingScreen />
  }

  return (
    <div className="content">
      <AnnouncementsHeader setRefreshData={setRefreshData} setIsAdding={setIsAdding} />
      <div className="mt-5 flex flex-col gap-3">
        {allAnnouncements.length > 0 ? allAnnouncements.map((anc, i) => (

          <AnnouncementCard key={i} data={anc} setRefreshData={setRefreshData} setIsDeleting={setIsDeleting} />
        )) : <><div className="mt-2 text-center p-4 border border-neutral-300 shadow-sm rounded-md"><p className="text-red-600 font-semibold">No Announcements Found</p></div></>}

      </div>
    </div>
  );
};

export default Announcements;

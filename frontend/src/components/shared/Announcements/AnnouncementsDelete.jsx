import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Loader2 } from "lucide-react";

const AnnouncementsDelete = ({ id, setRefreshData, setIsDeleting }) => {
  async function deleteAnnouncement() {
    setIsDeleting(true)
    try {
      await api.delete(`/announcements/delete/${id}`, { withCredentials: true })
      toast.success("Announcement deleted successfully!")
      setRefreshData(true)
    } catch (e) {
      console.error(e);
      toast.error("Couldn't delete announcement!")
    }
    finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className={"font-semibold cursor-pointer px-6"}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this announcement and you will not be
              able to undo this action.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className={"cursor-pointer "}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAnnouncement}
              className={"cursor-pointer "}

            >

              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AnnouncementsDelete;

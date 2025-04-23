import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export function LeaveRequestAction({
  status,
  employeeid,
  setIsLoading,
  setRefresh,
  type,
  days,
}) {
  const [remarks, setRemarks] = useState("");

  async function handleAction() {
    setIsLoading(true);
    let response;

    try {
      response = await api.post(
        "/leaves/updateRemarks",
        {
          id: employeeid,
          type: type,
          days: days,
          status: status === "Approve" ? "approved" : "rejected",
          remarks,
        },
        { withCredentials: true }
      );
      toast.success("Leave status updated successfully!");
      setRefresh(true);
    } catch {
      toast.error(response?.data?.message || "Errror updating leave request.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={status === "Approve" ? "outline" : "destructive"}>
          {status}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{status} Leave</DialogTitle>
          <DialogDescription>Leave remarks for your action</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <Input id="name" value={status} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Remarks
            </Label>
            <Input
              id="username"
              className="col-span-3"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleAction}>
            {status}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

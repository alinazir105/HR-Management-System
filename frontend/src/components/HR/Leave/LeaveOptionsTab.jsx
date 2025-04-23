import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingRequestsTable from "./PendingRequestsTable";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LeaveBalancesTable from "./LeaveBalancesTable";
import LeaveHistoryTable from "./LeaveHistoryTable";

export function LeaveOptionsTab() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchLeaveRequests() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/leaves/all-leaveRequests", {
          withCredentials: true,
        });
        setLeaveRequests(response.data.leaveRequests);
      } catch (e) {
        toast.error("Failed to fetch attendance");
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    async function fetchLeaveBalances() {
      setIsLoading(true);
      let response;
      try {
        response = await api.get("/leaves/all-leaveBalances", {
          withCredentials: true,
        });
        setLeaveBalances(response.data.leaveBalances);
      } catch (e) {
        toast.error("Failed to fetch Leave Balances");
        console.error("Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaveRequests();
    fetchLeaveBalances();
    setRefresh(false);
  }, [refresh]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Tabs defaultValue="pending" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="cursor-pointer" value="pending">
          Pending Requests
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="balance">
          Leave Balances
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="history">
          Leave History
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pending">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Approve or Reject Leave Requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <PendingRequestsTable
              leaveRequests={leaveRequests}
              setIsLoading={setIsLoading}
              setRefresh={setRefresh}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="balance">
        <Card>
          <CardHeader>
            <CardTitle>Leave Balances</CardTitle>
            <CardDescription>
              Check each employees' request balances.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LeaveBalancesTable
              leaveBalances={leaveBalances}
              setIsLoading={setIsLoading}
              setRefresh={setRefresh}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests History</CardTitle>
            <CardDescription>
              View all previous leave requests' records.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LeaveHistoryTable
              leaveRequests={leaveRequests}
              setIsLoading={setIsLoading}
              setRefresh={setRefresh}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import DashboardLayout from "./components/shared/Layout/DashboardLayout";
import ProtectedRoute from "./components/shared/Layout/ProtectedRoute";
import { SessionProvider } from "./contexts/Session/SessionProvider";
import RequestReset from "./pages/RequestReset";
import VerifyReset from "./pages/VerifyReset";
import NewPassword from "./pages/NewPassword";
import HrHome from "./components/HR/Homepage/Home";
import {
  Home,
  Calendar,
  Inbox,
  ListChecks,
  Users,
  DoorOpen,
  CreditCard,
  CircleDollarSign,
  Megaphone,
  Star,
  UserPen,
  Clock,
  UserRoundCheck,
} from "lucide-react";
import ManageEmployees from "./components/HR/ManageEmployees/ManageEmployees";
import MyAttendance from "./components/Employee/Attendance/MyAttendance";
import LeaveRequests from "./components/Employee/LeaveRequests/LeaveRequests";
import Announcements from "./components/shared/Announcements/Announcements";
import Profile from "./components/Employee/Profile/Profile";
import PerformanceReview from "./components/Employee/Performance/PerformanceReview";
import Attendance from "./components/HR/Attendance/Attendance";
import PerformanceEvaluation from "./components/HR/Performance/PerformanceEvaluation";

const hrNavItems = [
  { title: "Home", url: "/hr/dashboard", icon: Home },
  { title: "Employees", url: "/hr/dashboard/manage-employees", icon: Users },
  {
    title: "Announcements",
    url: "/hr/dashboard/announcements",
    icon: Megaphone,
  },
  {
    title: "Manage Attendance",
    url: "/hr/dashboard/attendance",
    icon: UserRoundCheck,
  },
  {
    title: "Leave Management",
    url: "/hr/dashboard/leave",
    icon: Calendar,
  },
  {
    title: "Payroll Management",
    url: "/hr/dashboard/payroll",
    icon: CreditCard,
  },
  {
    title: "Performance Evaluation",
    url: "/hr/dashboard/performance",
    icon: Star,
  },
  {
    title: "Recruitment Portal",
    url: "/hr/dashboard/recruitment",
    icon: Inbox,
  },
];
const employeeNavItems = [
  { title: "Home", url: "/employee/dashboard", icon: Home },
  {
    title: "My Attendance",
    url: "/employee/dashboard/attendance",
    icon: Clock,
  },
  { title: "Leave Requests", url: "/employee/dashboard/leave", icon: DoorOpen },
  {
    title: "Payroll",
    url: "/employee/dashboard/payroll",
    icon: CircleDollarSign,
  },
  {
    title: "Announcements",
    url: "/employee/dashboard/announcements",
    icon: Megaphone,
  },
  {
    title: "Performance Review",
    url: "/employee/dashboard/performance",
    icon: Star,
  },
  { title: "User Profile", url: "/employee/dashboard/profile", icon: UserPen },
];

const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route index path="/login" element={<Login />} />

          <Route path="/reset-password/request" element={<RequestReset />} />
          <Route path="/reset-password/verify" element={<VerifyReset />} />
          <Route
            path="/reset-password/new-password"
            element={<NewPassword />}
          />

          <Route element={<ProtectedRoute allowedRole="hr" />}>
            <Route
              path="/hr/dashboard"
              element={<DashboardLayout navItems={hrNavItems} />}
            >
              {/* HR Routes will go here */}
              <Route index element={<HrHome />} />
              <Route
                path="/hr/dashboard/manage-employees"
                element={<ManageEmployees />}
              />
              <Route
                path="/hr/dashboard/announcements"
                element={<Announcements />}
              />
              <Route path="/hr/dashboard/attendance" element={<Attendance />} />
              <Route path="/hr/dashboard/performance" element={<PerformanceEvaluation />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRole="employee" />}>
            <Route
              path="/employee/dashboard"
              element={<DashboardLayout navItems={employeeNavItems} />}
            >
              {/* Employee Routes will go here */}
              <Route index />
              <Route
                path="/employee/dashboard/attendance"
                element={<MyAttendance />}
              />
              <Route
                path="/employee/dashboard/leave"
                element={<LeaveRequests />}
              />
              <Route
                path="/employee/dashboard/announcements"
                element={<Announcements />}
              />
              <Route
                path="/employee/dashboard/profile"
                element={<Profile />}
              />
              <Route
                path="/employee/dashboard/performance"
                element={<PerformanceReview />}
              />
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;

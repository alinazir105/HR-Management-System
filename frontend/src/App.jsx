import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import DashboardLayout from "./components/shared/Layout/DashboardLayout";
import ProtectedRoute from "./components/shared/Layout/ProtectedRoute";
import { SessionProvider } from "./contexts/Session/SessionProvider";
import { Home, Calendar, Inbox } from "lucide-react";
import HomeComp from "./pages/Home";
import RequestReset from "./pages/RequestReset";
import VerifyReset from "./pages/VerifyReset";
import NewPassword from "./pages/NewPassword";

const hrNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Schedule", url: "/hr/dashboard/schedule", icon: Calendar },
  { title: "Inbox", url: "/inbox", icon: Inbox },
];
const employeeNavItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Inbox", url: "/inbox", icon: Inbox },
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
              <Route index element={<HomeComp />} />
              <Route path="" />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRole="employee" />}>
            <Route
              path="/employee/dashboard"
              element={<DashboardLayout navItems={employeeNavItems} />}
            >
              {/* Employee Routes will go here */}
              <Route index />
              <Route path="" />
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;

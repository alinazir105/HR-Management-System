import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import HRLayout from "./components/HR/Layout/HRLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute allowedRole="hr" />}>
          <Route path="/hr/dashboard" element={<HRLayout />}>
            {/* HR Routes will go here */}
            <Route index />
            <Route path="" />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="employee" />}>
          <Route path="/employee/dashboard">
            {/* Employee Routes will go here */}
            <Route index />
            <Route path="" />
          </Route>
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

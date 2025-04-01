import api from "@/lib/api";
import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Outlet } from "react-router-dom";
import LoadingIcon from "./LoadingIcon";

const ProtectedRoute = ({ allowedRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const response = await api.get("/auth/me", { withCredentials: true });

      if (response.status === 200) {
        const userRole = response.data.message.role;

        if (allowedRole !== userRole) {
          toast.error("Unauthorized access.");

          navigate("/login");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      }
    } catch {
      toast.error("Session expired. Please log in again.");
      navigate("/login");
    }
  }, [navigate, allowedRole]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (isAuthorized === null) {
    return <LoadingIcon />;
  }

  return isAuthorized ? <Outlet /> : null;
};

export default ProtectedRoute;

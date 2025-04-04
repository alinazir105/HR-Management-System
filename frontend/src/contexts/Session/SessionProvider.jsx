import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import api from "@/lib/api";

const publicRoutes = [
  "/reset-password/request",
  "/reset-password/verify",
  "/reset-password/new-password",
];

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchSessionData = useCallback(async () => {
    if (sessionData) {
      console.log("Session data already fetched, skipping fetch.");
      return;
    }
    if (publicRoutes.includes(location.pathname)) {
      return;
    }
    console.log("Fetching session data from server");

    setIsLoading(true);
    try {
      const response = await api.get("/auth/me", { withCredentials: true });
      const data = response.data.message;
      setSessionData(data);
    } catch {
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  }, [navigate, sessionData, location.pathname]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  useEffect(() => {
    if (sessionData && location.pathname === "/login") {
      console.log("User is already authenticated, redirecting...");
      setIsRedirecting(true);
      setTimeout(() => {
        if (sessionData.role === "hr") {
          navigate("/hr/dashboard");
        } else if (sessionData.role === "employee") {
          navigate("/employee/dashboard");
        } else {
          navigate("/login");
        }
      }, 1700);
    }
  }, [location.pathname, sessionData, navigate]);

  const refreshSession = async () => {
    console.log("Refreshing session...");
    setIsLoading(true);
    try {
      const response = await api.get("/auth/me", { withCredentials: true });
      const data = response.data.message;
      setSessionData(data);
      console.log("Session refreshed:", data);
    } catch {
      setSessionData(null);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        isLoading,
        refreshSession,
        setSessionData,
        isRedirecting,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

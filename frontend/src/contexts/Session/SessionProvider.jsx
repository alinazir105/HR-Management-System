import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "./SessionContext";
import api from "@/lib/api";

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const fetchSessionData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/auth/me", { withCredentials: true });
      const data = response.data.message;
      setSessionData(data);

      if (data && window.location.pathname.includes("/login")) {
        if (data.role === "hr") {
          navigate("/hr/dashboard");
        } else if (data.role === "employee") {
          navigate("/employee/dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch {
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  const refreshSession = () => {
    console.log("Refreshing session...");
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionData,
        isLoading,
        refreshSession,
        setSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

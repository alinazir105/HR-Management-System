import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isVerified] = useState(useLocation().state?.pure);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setemailError("");
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }
  async function handleNewPasswordSubmit(e) {
    e.preventDefault();
    setButtonClicked(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!email) {
      setemailError("Email is required!");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setemailError("Invalid email format!");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid) {
      let response;
      try {
        response = await api.post("/password-reset/new-password", {
          email,
          password,
        });
        toast.success(response.data.message);
        navigate("/login");
      } catch {
        console.error("Couldn't set new password");
        toast.error(response.data.message);
      }
    }
    setButtonClicked(false);
  }

  useEffect(() => {
    if (!isVerified) {
      toast.error("Get better");
      navigate("/login");
    }
  }, [isVerified, navigate]);

  useEffect(() => {
    if (buttonClicked) {
      window.history.pushState(null, "", window.location.href);
      const handlePopState = () => {
        toast.info("Please wait until the process is complete!");
        window.history.pushState(null, "", window.location.href);
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [buttonClicked]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleNewPasswordSubmit}
        className="flex flex-col gap-7 p-10"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl text-blue-600 font-bold">
            Change your password
          </h1>
          <p className="text-neutral-500 text-sm">
            Enter your work email and a new password below to change your
            password
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div>
              <Input
                type="text"
                placeholder="Work Email"
                value={email}
                id="email"
                onChange={handleEmailChange}
                disabled={buttonClicked}
              />
            </div>
            <div>
              {emailError && (
                <p className="text-red-500 font-semibold text-sm">
                  {emailError}
                </p>
              )}
            </div>
          </div>
          <div className="inputLabel flex flex-col gap-1">
            <div>
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                id="password"
                onChange={handlePasswordChange}
                disabled={buttonClicked}
              />
            </div>
            <div>
              {passwordError && (
                <p className="text-red-500 font-semibold text-sm">
                  {passwordError}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <Button
              type="submit"
              className={
                "w-full bg-blue-700 hover:bg-blue-800 cursor-pointer font-semibold"
              }
              disabled={buttonClicked ? true : false}
            >
              {buttonClicked && <Loader2 className="animate-spin" />}
              Save Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;

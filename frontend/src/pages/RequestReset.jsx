import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendResetCode } from "@/lib/sendResetCode";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RequestReset = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setemailError("");
  }

  async function handleEmailRequest(e) {
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

    if (valid) {
      const success = await sendResetCode(email);
      if (success) {
        navigate("/reset-password/verify", { state: { email } });
      }
    }
    setButtonClicked(false);
  }

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
      <div>
        <form
          onSubmit={handleEmailRequest}
          className="flex flex-col gap-7 p-10 "
        >
          <div className="flex flex-col gap-1">
            <div>
              <h1 className="text-4xl text-blue-600 font-bold">
                Reset Your Password
              </h1>
            </div>
            <div>
              <p className="text-neutral-500 text-sm">
                Enter your email address and we will send you a verification
                code!
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <Input
                type="text"
                placeholder="Email"
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
                Send Verification Code
              </Button>
            </div>
            <div className="flex justify-center mt-1.5 ">
              <Button variant="link" disabled={buttonClicked ? true : false}>
                <Link className="text-neutral-500" to="/login">
                  Return To Login
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestReset;

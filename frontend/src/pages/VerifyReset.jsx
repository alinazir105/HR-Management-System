import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { sendResetCode } from "@/lib/sendResetCode";
import { toast } from "sonner";
import LoadingIcon from "@/components/ui/LoadingIcon";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";

const VerifyReset = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState("");
  const [email] = useState(useLocation().state?.email);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [, setCountdown] = useState(10);

  function handleResendCode() {
    if (email) {
      setLoading(true);
      sendResetCode(email);

      setCanResend(false);
      let timer = 10;
      const interval = setInterval(() => {
        timer--;
        setCountdown(timer);
        if (timer === 0) {
          setCanResend(true);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      toast.error(
        "An error occured while resending the code. Please enter email again."
      );
      navigate("/reset-password/request");
    }
    setLoading(false);
  }

  function verifyCode(e) {
    e.preventDefault();

    if (!otpCode || otpCode.length < 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }
    setLoading(true);
    let response;
    try {
      response = api.post("/password-reset/verify", {
        email,
        otpCode,
      });
      toast.success(response.data.message);
      navigate("/reset-password/new-password");
    } catch {
      toast.error(response.data.message);
      navigate("/reset-password/request");
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <LoadingScreen />}
      <div>
        <form onSubmit={verifyCode} className="flex flex-col gap-7 p-10 ">
          <div className="flex flex-col gap-1">
            <div>
              <h1 className="text-4xl text-blue-600 font-bold">
                Verification Code
              </h1>
            </div>
            <div>
              <p className="text-neutral-500 text-sm">
                Enter the 6-digit verification code sent to your email address.
              </p>
            </div>
          </div>
          <div className="mx-auto">
            <div>
              <InputOTP
                value={otpCode}
                maxLength={6}
                onChange={(value) => setOtpCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>
          <div>
            <div>
              <Button
                type="submit"
                className={
                  "w-full bg-blue-700 hover:bg-blue-800 cursor-pointer font-semibold"
                }
              >
                Verify Code
              </Button>
            </div>
            <div className="flex justify-center mt-1.5 ">
              <button
                type="button"
                className="text-neutral-500 text-sm hover:underline mt-1 cursor-pointer transition-all"
                onClick={handleResendCode}
                disabled={canResend}
              >
                Resend Code
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyReset;

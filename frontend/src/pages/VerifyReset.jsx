import React, { useState, useEffect } from "react";
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
import LoadingScreen from "@/components/ui/LoadingScreen";
import api from "@/lib/api";

const VerifyReset = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState("");
  const [email] = useState(useLocation().state?.email);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  async function handleResendCode() {
    if (!email) {
      toast.error(
        "An error occurred while resending the code. Please enter your email again."
      );
      navigate("/reset-password/request");
      return;
    }

    setLoading(true);
    await sendResetCode(email);

    setCanResend(false);
    setCountdown(10);

    setLoading(false);
  }

  async function verifyCode(e) {
    e.preventDefault();

    if (!otpCode || otpCode.length < 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/password-reset/verify", {
        email,
        otpCode,
      });
      toast.success(response.data.message);
      navigate("/reset-password/new-password", { state: { pure: true } });
    } catch {
      toast.error("Invalid code. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <LoadingScreen />}
      <div>
        <form onSubmit={verifyCode} className="flex flex-col gap-7 p-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl text-blue-600 font-bold">
              Verification Code
            </h1>
            <p className="text-neutral-500 text-sm">
              Enter the 6-digit verification code sent to your email address.
            </p>
          </div>
          <div className="mx-auto">
            <InputOTP
              value={otpCode}
              maxLength={6}
              onChange={(value) => setOtpCode(value)}
              disabled={loading}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    disabled={loading}
                    className="w-11 h-11 sm:w-14 sm:h-14 text-2xl text-center text-neutral-500"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer font-semibold"
              disabled={loading}
            >
              Verify Code
            </Button>
            <div className="flex justify-center mt-1.5">
              <button
                type="button"
                className={`text-neutral-500 text-sm  mt-1 ${
                  canResend ? "cursor-pointer hover:underline" : "cursor-auto"
                } transition-all`}
                onClick={handleResendCode}
                disabled={!canResend}
              >
                {canResend ? "Resend Code" : `Resend in ${countdown}s`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyReset;

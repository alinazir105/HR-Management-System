import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import { useSession } from "@/contexts/Session/SessionContext";
import LoadingIcon from "@/components/ui/LoadingIcon";
import LoadingScreen from "@/components/ui/LoadingScreen";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, isRedirecting } = useSession();

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberCheckbox, setRememberCheckbox] = useState(false);
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [CheckboxError, setCheckboxError] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setemailError("");
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordError("");
  }

  function handleRememberCheckboxChange(checked) {
    setRememberCheckbox(checked);
    setCheckboxError("");
  }

  async function handleLogin(event) {
    event.preventDefault();
    setButtonClicked(true);
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!Email) {
      setemailError("Email is required!");
      valid = false;
    } else if (!emailRegex.test(Email)) {
      setemailError("Invalid email format!");
      valid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required!");
      valid = false;
    }

    // Checkbox validation
    if (!rememberCheckbox) {
      setCheckboxError("You must accept terms and conditions!");
      valid = false;
    }

    if (valid) {
      try {
        const email = Email;
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        toast.success("Login successful!");
        navigate(`/${response.data.role}/dashboard`, { state: { isLoggedIn: true } });
      } catch (error) {
        console.error(error);
        toast.error("Invalid email or password!");
        // toast("bla", { style: { backgroundColor: "red" } });
      }
    }
    setButtonClicked(false);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="mainContainer flex min-h-screen justify-between items-center">
        {isRedirecting && (
          <LoadingScreen
            message={"Session found! Redirecting to dashboard..."}
          />
        )}
        <div className="w-full h-screen lg:w-1/2 flex justify-center items-center p-10">
          <form
            className="flex justify-center items-center"
            onSubmit={handleLogin}
          >
            <div className=" p-10 flex flex-col gap-7 sm:w-[28em] lg:w-[28em] xl:w-[35em]">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-5xl text-blue-600 font-bold">Login</h1>
                </div>
                <div>
                  <h3 className="text-neutral-500 text-2xl">
                    Login to your account
                  </h3>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="inputLabel flex flex-col gap-1">
                  <div>
                    <label
                      className="text-blue-600 font-semibold text-[1em]"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Email"
                      value={Email}
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
                    <label
                      className="text-blue-600 font-semibold text-[1em]"
                      htmlFor="password"
                    >
                      Password
                    </label>
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
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
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className={"cursor-pointer"}
                      id="terms"
                      checked={rememberCheckbox}
                      onCheckedChange={handleRememberCheckboxChange}
                      disabled={buttonClicked}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-neutral-500 "
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                  {CheckboxError && (
                    <p className="text-red-500 font-semibold text-sm mt-1">
                      {CheckboxError}
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
                    disabled={buttonClicked}
                  >
                    {buttonClicked && <Loader2 className="animate-spin" />}
                    Login
                  </Button>
                </div>
                <div className="flex justify-center mt-2 ">
                  <Button variant="link" disabled={buttonClicked}>
                    <Link
                      className="text-neutral-500"
                      to="/reset-password/request"
                    >
                      Reset Password?
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Image */}
        <div className="hidden lg:block w-1/2 h-screen relative">
          <div className="absolute z-10 bottom-35 lg:bottom-40 left-10 right-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              Manage all <span className="text-yellow-400">HR Operations</span>{" "}
              from the comfort of your home.
            </h1>
          </div>
          <div className="w-full h-full bg-blue-800 opacity-60 absolute">
            {/* Blue */}
          </div>
          <img
            className="h-full w-full object-cover"
            src="/hr-loginBackground.jpg"
            alt="Login Background"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

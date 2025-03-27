import React from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      {/* Mobile Phone */}
      <div className="mainContainer flex min-h-screen justify-center items-center">
        <div className=" p-10 flex flex-col gap-7 lg:w-[30em]">
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
                <Input type="email" placeholder="Email" />
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
                <Input type="password" placeholder="Password" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm text-neutral-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Button className={"w-full "}>Login</Button>
            </div>
            <div className="flex justify-center mt-2">
              <Button variant="link">
                <Link to="">Reset Password?</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

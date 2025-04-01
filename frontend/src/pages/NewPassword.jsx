import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError("");
  }
  function handleNewPasswordSubmit(e) {
    e.preventDefault();
  }
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
            Enter a new password below to change your password
          </p>
        </div>
        <div>
          <div className="inputLabel flex flex-col gap-1">
            <div>
              <Input
                type="password"
                placeholder="New Password"
                value={password}
                id="password"
                onChange={handlePasswordChange}
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
            >
              Save Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPassword;

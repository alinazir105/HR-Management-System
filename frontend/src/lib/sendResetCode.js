import { toast } from "sonner";
import api from "./api";

export async function sendResetCode(email) {
  try {
    await api.post(
      "http://localhost:3000/api/password-reset/request",
      { email },
      { withCredentials: true }
    );
    toast.success("Verification code has been sent!");
    return true;
  } catch (error) {
    console.error(error);
    toast.error("Email not found!");
  }
}

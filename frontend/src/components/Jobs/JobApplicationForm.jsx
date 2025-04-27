import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvailableJobsCards from "./AvailableJobsCards";

import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";

export function JobApplicationForm({ job, setIsLoading, setRefresh }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    cv: "",
  });

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "file" ? (files ? files[0] : null) : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateForm = () => {
    let formErrors = { name: "", email: "", phone: "", cv: "" };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is not valid";
      isValid = false;
    }

    // Phone number validation
    if (!formData.phone.trim()) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^03\d{2}-\d{7}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be in the format 03XX-XXXXXXX";
      isValid = false;
    }

    if (!formData.cv) {
      formErrors.cv = "CV upload is required";
      isValid = false;
    } else {
      const fileExtension = formData.cv.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'docx', 'doc'];
      if (!allowedExtensions.includes(fileExtension)) {
        formErrors.cv = "Invalid file type. Only PDF or DOCX files are allowed.";
        isValid = false;
      }

      if (formData.cv.size > 10 * 1024 * 1024) {
        formErrors.cv = "File size exceeds 10MB limit.";
        isValid = false;
      }
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("job", JSON.stringify(job));
      formDataToSend.append("resume", formData.cv);
      try {
        setIsLoading(true);
        const response = await api.post(
          "/recruitment/apply-for-job",
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
        );
        toast.success(response.data.message);
        setRefresh(true);
      } catch (error) {
        console.log(error)
        toast.error("Failed to submit application");
      } finally {
        setIsLoading(false);
      }

    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full">
          <AvailableJobsCards job={job} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            {job.description}
          </DialogDescription>
        </DialogHeader>

        {/* Job Details */}
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p>
            📍 <strong>Location: </strong>
            {job.location}
          </p>
          <p>
            💼 <strong>Type:</strong> {job.job_type}
          </p>
          <p>
            🛠️ <strong>Skills: </strong>
            {job.skills_required}
          </p>
          <p>
            🧠 <strong>Experience:</strong> {job.experience_required}+ years
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="text"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="03XX-XXXXXXX"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv">Upload CV</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
            {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" className={"cursor-pointer"}>
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

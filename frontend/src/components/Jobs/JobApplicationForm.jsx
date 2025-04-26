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

export function JobApplicationForm({ job }) {
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
  };

  const validateForm = () => {
    let formErrors = { name: "", email: "", phone: "", cv: "" };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      formErrors.name = "Full name is required";
      isValid = false;
    }

    // Email validation
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
    } else if (!/^\d{3}-\d{7}$/.test(formData.phone)) {
      formErrors.phone = "Phone number must be in the format 03XX-XXXXXXX";
      isValid = false;
    }

    // CV validation
    if (!formData.cv) {
      formErrors.cv = "CV upload is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full">
          <AvailableJobsCards />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription className="text-gray-600">
            Design and develop high-quality, scalable frontend interfaces.
          </DialogDescription>
        </DialogHeader>

        {/* Job Details */}
        <div className="text-sm text-gray-700 space-y-1 mb-4">
          <p>
            📍 <strong>Location:</strong> Remote
          </p>
          <p>
            💼 <strong>Type:</strong> Full-time
          </p>
          <p>
            🛠️ <strong>Skills:</strong> React, Tailwind CSS, TypeScript
          </p>
          <p>
            🧠 <strong>Experience:</strong> 2+ years
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
              type="email"
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
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

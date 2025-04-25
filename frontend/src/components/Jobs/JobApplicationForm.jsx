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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function JobApplicationForm() {
  const jobTitle = "Frontend Developer";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full">
          <AvailableJobsCards />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
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
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Your full name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="03XX-XXXXXXX" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Select defaultValue={jobTitle}>
              <SelectTrigger>
                <SelectValue placeholder="Select job title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv">Upload CV</Label>
            <Input id="cv" type="file" accept=".pdf,.doc,.docx" />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button type="submit">Submit Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";

const EditEmployeeForm = ({ data, setIsLoading, setRefresh }) => {
  const firstname = data.name.split(" ")[0];
  const lastname = data.name.split(" ")[1];

  const [formData, setFormData] = useState({
    id: data.userid,
    firstname: firstname,
    lastname: lastname,
    email: data.email,
    department: data.department,
    jobtitle: data.job_title,
    employmenttype: data.employment_type,
    salary: data.salary,
    gender: data.gender,
  });

  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [jobtitleError, setJobtitleError] = useState("");
  const [employmentTypeError, setEmploymentTypeError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [genderError, setGenderError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the specific form data field
    setFormData({ ...formData, [name]: value });

    // Clear the error for the specific field being edited
    if (name === "firstname") {
      setFirstnameError("");
    }
    if (name === "lastname") {
      setLastnameError("");
    }
    if (name === "department") {
      setDepartmentError("");
    }
    if (name === "jobtitle") {
      setJobtitleError("");
    }
    if (name === "employmenttype") {
      setEmploymentTypeError("");
    }
    if (name === "salary") {
      setSalaryError("");
    }
    if (name === "gender") {
      setGenderError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Employee Data Submitted:", formData);

    let isValid = true;

    // First name
    if (formData.firstname === "") {
      setFirstnameError("First name is required!");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstname)) {
      setFirstnameError("First name must contain only letters");
      isValid = false;
    }

    // Last name
    if (formData.lastname === "") {
      setLastnameError("Last name is required!");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastname)) {
      setLastnameError("Last name must contain only letters");
      isValid = false;
    }

    // Department
    if (formData.department === "") {
      setDepartmentError("Department is required!");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.department)) {
      setDepartmentError("Department must contain only letters");
      isValid = false;
    }

    // Job title
    if (formData.jobtitle === "") {
      setJobtitleError("Job title is required!");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.jobtitle)) {
      setJobtitleError("Job title must contain only letters");
      isValid = false;
    }

    // Employment type
    if (!formData.employmenttype) {
      setEmploymentTypeError("Employment type is required!");
      isValid = false;
    }

    // Salary
    if (formData.salary === "") {
      setSalaryError("Salary is required!");
      isValid = false;
    } else if (isNaN(formData.salary)) {
      setSalaryError("Salary must be a number");
      isValid = false;
    }

    // Gender
    if (!formData.gender) {
      setGenderError("Gender is required!");
      isValid = false;
    }

    if (!isValid) {
      return; // Stop if any validation failed
    }

    let response;
    try {
      setIsLoading(true);
      response = await api.post("/employees/update", formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setRefresh(true);
    } catch {
      toast.error("Error updating employees!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={"mr-2 cursor-pointer"}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[35em] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={"text-xl font-semibold"}>
              Edit Employee
            </DialogTitle>
            <DialogDescription>
              Fill in the details to modify the employee.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                disabled
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                maxLength={30}
              />
            </div>

            {/* First Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="">
                First Name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="col-span-3"
                maxLength={30}
              />
              {firstnameError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {firstnameError}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="">
                Last Name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="col-span-3"
                maxLength={40}
              />
              {lastnameError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {lastnameError}
                </p>
              )}
            </div>

            {/* Department */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="">
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="col-span-3"
                maxLength={50}
              />
              {departmentError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {departmentError}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobtitle" className="text-right">
                Job Title
              </Label>
              <Input
                id="jobtitle"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                className="col-span-3"
                maxLength={50}
              />
              {jobtitleError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {jobtitleError}
                </p>
              )}
            </div>

            {/* Employment Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employmenttype" className="">
                Employment Type
              </Label>
              <select
                id="employmenttype"
                name="employmenttype"
                value={formData.employmenttype}
                onChange={handleChange}
                className="col-span-3 border rounded-md p-2"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>

              {employmentTypeError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {employmentTypeError}
                </p>
              )}
            </div>

            {/* Salary */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary
              </Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                className="col-span-3"
                min={0}
              />
              {salaryError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {salaryError}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="col-span-3 border rounded-md p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {genderError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {genderError}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Edit Employee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditEmployeeForm;

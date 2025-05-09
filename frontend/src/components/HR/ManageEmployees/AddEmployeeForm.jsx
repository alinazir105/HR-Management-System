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

const AddEmployeeForm = ({ setIsLoading, setRefresh }) => {
  const [formData, setFormData] = useState({
    hashedPassword: "",
    firstname: "",
    lastname: "",
    email: "",
    department: "",
    jobtitle: "",
    employmenttype: "Full-Time",
    salary: "",
    gender: "Male",
  });

  const [pswdError, setPswdError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
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
    if (name === "hashedPassword") {
      setPswdError("");
    }
    if (name === "firstname") {
      setFirstnameError("");
    }
    if (name === "lastname") {
      setLastnameError("");
    }
    if (name === "email") {
      setEmailError("");
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

    // Password validation
    if (formData.hashedPassword === "") {
      setPswdError("Password is required!");
      isValid = false;
    } else if (formData.hashedPassword.length < 6) {
      setPswdError("Password must be at least 6 characters");
      isValid = false;
    }

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

    // Email
    if (formData.email === "") {
      setEmailError("Email is required!");
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError("Invalid email format");
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
      response = await api.post("/employees/add", formData, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setRefresh(true);
      handleReset();
    } catch {
      toast.error(response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  function handleReset() {
    setPswdError("");
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setDepartmentError("");
    setJobtitleError("");
    setEmploymentTypeError("");
    setSalaryError("");
    setGenderError("");

    setFormData({
      hashedPassword: "",
      firstname: "",
      lastname: "",
      email: "",
      department: "",
      jobtitle: "",
      employmenttype: "Full-Time",
      salary: "",
      gender: "Male",
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className={"cursor-pointer"}>
            <Plus className="mr-2" /> Add Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[35em] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className={"text-xl font-semibold"}>
              Add Employee
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new employee.
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
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
              />
              {emailError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {emailError}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hashedPassword" className="text-right">
                Password
              </Label>
              <Input
                id="hashedPassword"
                name="hashedPassword"
                type="password"
                value={formData.hashedPassword}
                onChange={handleChange}
                className="col-span-3"
              />
              {pswdError && (
                <p className="text-red-500 font-bold text-sm col-span-4 mt-0">
                  {pswdError}
                </p>
              )}
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
              <Button onClick={handleReset} variant={"outline"}>
                Reset
              </Button>
              <Button type="submit">Save Employee</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeForm;

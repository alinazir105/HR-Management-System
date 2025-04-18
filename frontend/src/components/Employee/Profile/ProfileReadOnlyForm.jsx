import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const ProfileReadOnlyForm = ({ data }) => {
    const [showSalary, setShowSalary] = useState(false)

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-semibold mb-4">Job Details (Read-Only)</h2>
            <div className="space-y-4">

                {/* Employee ID */}
                <div>
                    <Label htmlFor="employeeId" className={"mb-1.5"}>Employee ID</Label>
                    <Input id="employeeId" disabled value={data.employeeid || ""} />
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email" className={"mb-1.5"}>Email</Label>
                    <Input id="email" type="email" disabled value={data.email || ""} />
                </div>

                {/* Department */}
                <div>
                    <Label htmlFor="department" className={"mb-1.5"}>Department</Label>
                    <Input id="department" disabled value={data.department || ""} />
                </div>

                {/* Job Title */}
                <div>
                    <Label htmlFor="jobTitle" className={"mb-1.5"}>Job Title</Label>
                    <Input id="jobTitle" disabled value={data.job_title || ""} />
                </div>

                {/* Start Date */}
                <div>
                    <Label htmlFor="startDate" className={"mb-1.5"}>Start Date</Label>
                    <Input id="startDate" disabled value={data.start_date || ""} />
                </div>

                {/* Employment Type */}
                <div>
                    <Label htmlFor="employmentType" className={"mb-1.5"}>Employment Type</Label>
                    <Input id="employmentType" disabled value={data.employment_type || ""} />
                </div>

                {/* Salary */}
                <div>
                    <Label htmlFor="salary" className={"mb-1.5"}>Salary</Label>
                    <div className="flex gap-2 items-center w-full">
                        <Input
                            id="salary"
                            type="text"
                            disabled
                            value={showSalary ? (data.salary?.split(".")[0] || "") : "-"}
                            className="max-w-sm"
                        />
                        <Button
                            type="button"

                            onClick={() => setShowSalary(!showSalary)}
                            className="cursor-pointer bg-blue-600 font-semibold hover:bg-blue-700"
                        >
                            {showSalary ? "Hide" : "Show"}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileReadOnlyForm

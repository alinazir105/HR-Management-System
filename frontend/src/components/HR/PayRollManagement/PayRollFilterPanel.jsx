import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState } from "react";
const PayrollFilterPanel = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");

  const handleFilter = () => {
    console.log("Filters applied:");
    console.log("Name:", nameFilter);
    console.log("Department:", departmentFilter);
    console.log("Month:", monthFilter);
  }
  return (
    <div className="flex flex-wrap gap-4 justify-around">
      <Input
        type="text"
        placeholder="Search by Employee Name"
        className="w-60"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Employees" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hr">HR</SelectItem>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
        </SelectContent>
      </Select>

      <Input 
      type="month" 
      className="w-48"
      value={monthFilter}
      onChange={(e) => setMonthFilter(e.target.value)}
      />
      <Button className="w-32" onClick={handleFilter}>Filter</Button>
    </div>
  );
};

export default PayrollFilterPanel;
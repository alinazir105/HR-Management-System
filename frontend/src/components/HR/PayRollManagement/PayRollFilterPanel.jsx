import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const PayrollFilterPanel = ({
  nameFilter,
  departmentFilter,
  monthFilter,
  onNameChange,
  onDepartmentChange,
  onMonthChange,
  onFilter,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-end mb-6">
      <Input
        type="text"
        placeholder="Search by Employee Name"
        className="w-60"
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <Select value={departmentFilter} onValueChange={onDepartmentChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="hr">HR</SelectItem>
          <SelectItem value="engineering">Engineering</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="month"
        className="w-48"
        value={monthFilter}
        onChange={(e) => onMonthChange(e.target.value)}
      />

      <Button className="w-32" onClick={onFilter}>
        Filter
      </Button>
    </div>
  );
};

export default PayrollFilterPanel;

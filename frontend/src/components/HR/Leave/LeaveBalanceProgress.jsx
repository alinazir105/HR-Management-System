import { Progress } from "@/components/ui/progress";

export function LeaveBalanceProgress({ used, total }) {
  const progress = total > 0 ? Math.round((used / total) * 100) : 0;
  const status =
    progress > 0 && progress <= 33
      ? "red"
      : progress > 33 && progress <= 66
      ? "yellow"
      : "green";

  return (
    <Progress
      value={progress}
      className={`w-[60%] ${
        status === "green"
          ? "bg-gray-200 [&>div]:bg-green-500"
          : status === "yellow"
          ? "bg-gray-200 [&>div]:bg-yellow-300"
          : status === "red"
          ? "bg-gray-200 [&>div]:bg-red-600"
          : ""
      }`}
      title={`${used} used`}
    />
  );
}

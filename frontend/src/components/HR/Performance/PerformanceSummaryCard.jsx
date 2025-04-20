import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    BarChart3,
    Star,
    Users2,
    CircleCheck,
    AlertCircle,
    Target,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const StatBox = ({ title, value, color, icon: Icon }) => (
    <div className="flex items-start gap-4 bg-white shadow-sm rounded-xl py-2 px-4 border w-full hover:scale-[1.01] hover:bg-zinc-50 transition-all">
        {Icon && <Icon className={`text-${color}-500 mt-1`} size={24} />}
        <div className="flex flex-col">
            <span className="text-sm text-muted-foreground tracking-wide">
                {title}
            </span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    </div>
);

const PerformanceSummaryCard = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mt-4">
            <Card className={`flex-1 rounded-2xl shadow-md transition-all duration-500 ${isOpen ? "py-4" : "pb-0 pt-4.5"}`}>
                <CardHeader className="flex flex-row items-center justify-between px-6 ">
                    <CardTitle className="text-xl font-semibold">
                        Performance Overview
                    </CardTitle>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="text-muted-foreground hover:text-black transition cursor-pointer"
                    >
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </CardHeader>

                <div

                    className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[999px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-95'
                        }`}
                >
                    <CardContent className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            <StatBox icon={Star} title="Avg Rating" value="4.2" color="yellow" />
                            <StatBox icon={Users2} title="Reviewed" value="24 Employees" color="blue" />
                            <StatBox icon={AlertCircle} title="Pending" value="6 Reviews" color="red" />
                            <StatBox icon={BarChart3} title="Review Period" value="Q1 2025" color="purple" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <StatBox
                                icon={Star}
                                title="Top Rated Employee"
                                value={
                                    <>
                                        <p className="font-medium">Alice Smith</p>
                                        <p className="text-sm text-muted-foreground">Rating: 4.9</p>
                                    </>
                                }
                                color="green"
                            />
                            <StatBox
                                icon={Star}
                                title="Lowest Rated Employee"
                                value={
                                    <>
                                        <p className="font-medium">John Doe</p>
                                        <p className="text-sm text-muted-foreground">Rating: 2.7</p>
                                    </>
                                }
                                color="red"
                            />
                        </div>

                        <div className="grid grid-cols-1">
                            <StatBox
                                icon={Target}
                                title="Common Improvement Area"
                                value="Time Management"
                                color="orange"
                            />
                        </div>

                        <Card className="p-4 shadow-none border bg-muted/40 gap-2">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <CircleCheck className="text-green-500" size={18} />
                                    Goals Achieved
                                </div>
                                <span className="text-sm text-muted-foreground">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                        </Card>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default PerformanceSummaryCard;

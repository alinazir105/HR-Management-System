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

const PerformanceSummaryCard = ({ allPerformanceReviews }) => {
    const filterPeriod = allPerformanceReviews[0]?.period.trim();

    const filteredReviews = allPerformanceReviews.filter((review) => (review.period == filterPeriod));

    const ratings = filteredReviews
        .map((review) => parseFloat(review.rating))
        .filter((rating) => !isNaN(rating));

    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = ratings.length > 0 ? total / ratings.length : 0;

    const reviewedCount = filteredReviews.filter(
        (review) =>
            review.status?.toLowerCase() === "completed" ||
            review.status?.toLowerCase() === "reviewed"
    ).length;

    const pendingCount = filteredReviews.filter(
        (review) =>
            review.status?.toLowerCase() === "pending"
    ).length;

    const ratedReviews = filteredReviews.filter(
        (review) => !isNaN(parseFloat(review.rating))
    );

    const sortedByRating = [...ratedReviews].sort(
        (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
    );

    const highestRatedEmployee = sortedByRating[0];
    const lowestRatedEmployee = sortedByRating[sortedByRating.length - 1];

    const areaCounts = {};

    filteredReviews.forEach((review) => {
        if (Array.isArray(review.areas_to_improve)) {
            review.areas_to_improve.forEach((area) => {
                const cleanedArea = area.trim().toLowerCase();
                if (cleanedArea) {
                    areaCounts[cleanedArea] = (areaCounts[cleanedArea] || 0) + 1;
                }
            });
        }
    });

    let mostCommonArea = "None";
    let highestCount = 0;

    for (const [area, count] of Object.entries(areaCounts)) {
        if (count > highestCount) {
            highestCount = count;
            mostCommonArea = area;
        }
    }

    mostCommonArea = mostCommonArea.split(" ").map((value) => (value.charAt(0).toUpperCase() + value.slice(1))).join(" ")

    let totalGoalsSet = 0;
    let totalGoalsAchieved = 0;

    filteredReviews.forEach((review) => {
        if (Array.isArray(review.goals_set) && Array.isArray(review.goals_achieved)) {
            const goalsSet = review.goals_set.map((g) => g.trim().toLowerCase());
            const goalsAchieved = review.goals_achieved.map((g) => g.trim().toLowerCase());

            totalGoalsSet += goalsSet.length;

            goalsSet.forEach((goal) => {
                if (goalsAchieved.includes(goal)) {
                    totalGoalsAchieved++;
                }
            });
        }
    });

    const percentageGoalsAchieved =
        totalGoalsSet > 0 ? (totalGoalsAchieved / totalGoalsSet) * 100 : 0;


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
                            <StatBox icon={Star} title="Avg Rating" value={averageRating || "0"} color="yellow" />
                            <StatBox icon={Users2} title="Reviewed" value={(reviewedCount || "0") + " Employee(s)"} color="blue" />
                            <StatBox icon={AlertCircle} title="Pending" value={(pendingCount || "0") + " Reviews"} color="red" />
                            <StatBox icon={BarChart3} title="Review Period" value={filterPeriod || "N/A"} color="purple" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <StatBox
                                icon={Star}
                                title="Top Rated Employee"
                                value={
                                    <>
                                        <p className="font-medium">{highestRatedEmployee?.name || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">Rating: {highestRatedEmployee?.rating || "0"}</p>
                                    </>
                                }
                                color="green"
                            />
                            <StatBox
                                icon={Star}
                                title="Lowest Rated Employee"
                                value={
                                    <>
                                        <p className="font-medium">{lowestRatedEmployee?.name || "N/A"}</p>
                                        <p className="text-sm text-muted-foreground">Rating: {lowestRatedEmployee?.rating || "0"}</p>
                                    </>
                                }
                                color="red"
                            />
                        </div>

                        <div className="grid grid-cols-1">
                            <StatBox
                                icon={Target}
                                title="Common Improvement Area"
                                value={mostCommonArea || "None"}
                                color="orange"
                            />
                        </div>

                        <Card className="p-4 shadow-none border bg-muted/40 gap-2">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <CircleCheck className="text-green-500" size={18} />
                                    Goals Achieved
                                </div>
                                <span className="text-sm text-muted-foreground">{percentageGoalsAchieved.toFixed(0) || "0"}%</span>
                            </div>
                            <Progress value={percentageGoalsAchieved || 0} className="h-2" />
                        </Card>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
};

export default PerformanceSummaryCard;

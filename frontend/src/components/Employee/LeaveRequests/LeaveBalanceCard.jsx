import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const LeaveBalanceCard = ({ allLeaves }) => {
    const parsedLeaveData = {
        sick: {
            total: allLeaves.sick_leave_total || 0,
            used: allLeaves.sick_leave_used || 0,
        },
        annual: {
            total: allLeaves.annual_leave_total || 0,
            used: allLeaves.annual_leave_used || 0,
        },
        casual: {
            total: allLeaves.casual_leave_total || 0,
            used: allLeaves.casual_leave_used || 0,
        },
        parental: {
            total: allLeaves.parental_leave_total || 0,
            used: allLeaves.parental_leave_used || 0,
        },
    };

    const getRemaining = (total, used) => total - used;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
            {Object.entries(parsedLeaveData).map(([key, { total, used }]) => {
                const remaining = getRemaining(total, used);
                const progress = total > 0 ? Math.min((used / total) * 100, 100) : 0;
                return (
                    <Card
                        key={key}
                        className="shadow-md rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-lg hover:bg-muted/40"
                    >

                        <CardHeader>
                            <CardTitle className="text-md capitalize flex items-center gap-1">
                                {key} Leave

                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-muted-foreground">{used} used / {total} total</span>
                                <Badge variant="outline" className="text-xs "><span className="font-semibold">{remaining}</span>left</Badge>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default LeaveBalanceCard;

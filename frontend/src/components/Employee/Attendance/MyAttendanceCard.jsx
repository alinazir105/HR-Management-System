import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MyAttendanceCard = () => {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allAttendance, setAllAttendance] = useState(null)

    useEffect(() => {
        const fetchTodaysAttendance = async () => {
            setLoading(true)
            try {
                const response = await api.get('/attendance/today', { withCredentials: true });

                const { checkin, checkout } = response.data;

                if (checkin) {
                    setCheckInTime(checkin);
                }
                if (checkout) {
                    setCheckOutTime(checkout);
                }
            } catch {
                console.error("Error fetching today's attendance");
            }
            setLoading(false)
        };

        fetchTodaysAttendance();
    }, []);


    useEffect(() => {
        const fetchAllAttendance = async () => {
            setLoading(true)
            let response;
            try {
                response = await api.get('/attendance/all', { withCredentials: true });
                setAllAttendance(response.data.attendance)
            } catch {
                console.error("Error fetching all attendances");
                toast.error(response.data.message)
            }
            setLoading(false)
        };

        fetchAllAttendance();
    }, []);


    const handleCheckIn = async () => {
        setLoading(true);
        let response;
        try {
            response = await api.post("/attendance/check-in", {}, { withCredentials: true });
            toast.success(response.data.message);
            setCheckInTime(response.data.checkInTime);
        } catch {
            console.error("Error during check-in:");
            toast.error(response.data.message);
        }
        setLoading(false);
    };

    const handleCheckOut = async () => {
        setLoading(true);
        let response;
        try {
            response = await api.post("/attendance/check-out", {}, { withCredentials: true });
            toast.success(response.data.message);
            setCheckOutTime(response.data.checkOutTime);
        } catch {
            console.error("Error during check-out:");
            toast.error(response.data.message);
        }
        setLoading(false);
    };

    return (
        <div className="ml-10 mt-2 mr-8">
            <div className="flex gap-5 justify-between mt-2 flex-wrap">
                <h1 className="text-3xl font-bold">My Attendance</h1>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div>
                        <h2 className="text-xl font-semibold ">
                            {!checkInTime ? (
                                "You have not checked in yet"
                            ) : checkInTime && !checkOutTime ? (
                                <>
                                    You checked in at <span className="text-xl font-bold">{checkInTime}</span>
                                </>
                            ) : checkInTime && !checkOutTime ? (
                                <>
                                    Your attendance has been marked for today!
                                </>
                            ) : ""}
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        {!checkInTime && <div>
                            <Button variant={"outline"} onClick={handleCheckIn}>
                                {loading && <Loader2 className="animate-spin" />}
                                Check in
                            </Button>
                        </div>}
                        {checkInTime && !checkOutTime && <div>
                            <Button variant={"outline"} onClick={handleCheckOut}>
                                {loading && <Loader2 className="animate-spin" />}
                                Check out
                            </Button>
                        </div>}

                    </div>
                </div>
            </div>
            <div className="mt-10 border border-neutral-800">
                Table
            </div>
        </div>
    );
};

export default MyAttendanceCard;


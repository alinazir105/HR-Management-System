import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MyAttendanceCard = ({ setRefetch, }) => {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTodaysAttendance = async () => {
            setLoading(true)
            try {
                const response = await api.get('/attendance/my-today', { withCredentials: true });

                const { checkin, checkout } = response.data;
                const formattedCheckInTime = new Date(checkin).toLocaleTimeString();
                const formattedCheckOutTime = new Date(checkout).toLocaleTimeString();

                if (checkin) {
                    setCheckInTime(formattedCheckInTime);
                }
                if (checkout) {
                    setCheckOutTime(formattedCheckOutTime);
                }
            } catch (e) {
                console.error("Error fetching today's attendance" + e);
            }
            setLoading(false)
        };

        fetchTodaysAttendance();
    }, []);


    const handleCheckIn = async () => {
        setLoading(true);
        let response;
        try {
            response = await api.post("/attendance/check-in", {}, { withCredentials: true });
            toast.success(response.data.message);
            const formattedCheckInTime = new Date(response.data.checkInTime).toLocaleTimeString();
            setCheckInTime(formattedCheckInTime);
            setRefetch(true)
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
            const formattedCheckOutTime = new Date(response.data.checkOutTime).toLocaleTimeString();
            setCheckOutTime(formattedCheckOutTime);
            setRefetch(true)
        } catch {
            console.error("Error during check-out:");
            toast.error(response.data.message);
        }
        setLoading(false);
    };

    return (
        <div className="">
            <div className="flex gap-5 justify-between mt-4 flex-wrap items-start">
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
                            ) : checkInTime && checkOutTime ? (
                                <div className="bg-green-100 border border-green-300 text-green-900 px-6 py-2 rounded-xl shadow-md mx-auto text-center">
                                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                                        <span className="text-green-700">✅</span>
                                        Attendance Marked!
                                    </div>
                                </div>
                            ) : ""}
                        </h2>
                    </div>

                    <div className="flex gap-2">
                        {!checkInTime && <div>
                            <Button variant={"outline"} onClick={handleCheckIn} className={"cursor-pointer"} disabled={loading}>
                                {loading && <Loader2 className="animate-spin" />}
                                Check in
                            </Button>
                        </div>}
                        {checkInTime && !checkOutTime && <div>
                            <Button variant={"outline"} onClick={handleCheckOut} className={"cursor-pointer"} disabled={loading}>
                                {loading && <Loader2 className="animate-spin" />}
                                Check out
                            </Button>
                        </div>}

                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyAttendanceCard;


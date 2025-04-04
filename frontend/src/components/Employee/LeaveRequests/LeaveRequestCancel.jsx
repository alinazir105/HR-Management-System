import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import api from '@/lib/api';
import { toast } from 'sonner';


const LeaveRequestCancel = ({ leaveID, setRefreshData }) => {
    const [leaveRequestID,] = useState(leaveID);
    async function handleRequestRemove() {
        let response;
        try {
            response = await api.delete(`/leaves/remove-leave/${leaveRequestID}`,)
            toast.success(response.data.message)
            setRefreshData(true)
        }
        catch {
            toast.error("Error while cancelling request! Please try again later!")
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className={"cursor-pointer font-semibold"}>Cancel Request</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your leave request will be retracted and HR won't be able to see it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRequestRemove}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default LeaveRequestCancel

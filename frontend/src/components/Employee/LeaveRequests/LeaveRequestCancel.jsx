import React, { useState } from 'react'
import {
    AlertDialog,
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
import { Loader2 } from 'lucide-react';

const LeaveRequestCancel = ({ leaveID, setRefreshData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRequestRemove() {
        setIsLoading(true);
        try {
            const response = await api.delete(`/leaves/remove-leave/${leaveID}`);
            toast.success(response.data.message);
            setRefreshData(true);
            setIsOpen(false); // close manually after success
        } catch (e) {
            toast.error(e?.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className="cursor-pointer font-semibold"
                    onClick={() => setIsOpen(true)}
                >
                    Cancel Request
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your leave request will be retracted and HR won't be able to see it.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        onClick={handleRequestRemove}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        )}
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LeaveRequestCancel;

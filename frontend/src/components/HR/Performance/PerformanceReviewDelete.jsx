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
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/api'

const PerformanceReviewDelete = ({ id, setRefreshData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    async function handleDelete() {
        try {
            setIsLoading(true)
            const response = await api.delete(`/performance/delete/${id}`, { withCredentials: true })
            toast.success(response.data.message)
            setRefreshData(true)
        } catch (e) {
            console.error(e);
            toast.error(e?.response.data.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        size="icon"
                        variant="destructive"
                        className={"cursor-pointer hover:bg-red-800 transition-all"}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Review?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this review from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading} className={"cursor-pointer font-semibold"}>Cancel</AlertDialogCancel>
                        <Button className={"cursor-pointer font-semibold"} onClick={handleDelete} disabled={isLoading}>{isLoading && <Loader2 className='animate-spin' />} Continue</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default PerformanceReviewDelete

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
import { Loader2, Trash, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/api'

const RecruitmentJobDelete = ({ id, setRefresh }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    async function handleDeleteJob() {
        try {
            setIsLoading(true)
            await api.delete(`/recruitment/delete-job/${id}`, { withCredentials: true })
            toast.success("Job deleted successfully!")
            setIsOpen(false)
            setRefresh(true)
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
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
                        <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this job and remove from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading} className={"cursor-pointer font-semibold"}>Cancel</AlertDialogCancel>
                        <Button className={"cursor-pointer font-semibold"} onClick={handleDeleteJob} disabled={isLoading}>{isLoading && <Loader2 className='animate-spin' />}Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default RecruitmentJobDelete

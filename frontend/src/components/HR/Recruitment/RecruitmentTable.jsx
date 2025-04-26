import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import RecruitmentJobView from './RecruitmentJobView'
import RecruitmentJobEdit from './RecruitmentJobEdit'
import RecruitmentJobDelete from './RecruitmentJobDelete'

const headings = [
    "Job ID",
    "Job Title",
    "Date Posted",
    "Total Applicants",
    "Openings",
    "Deadline",
    "Actions",
]

const RecruitmentTable = ({ allJobs, setRefresh, refresh }) => {
    return (
        <div className="rounded-xl border shadow-sm mt-5">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 text-left">
                        {headings.map((heading, index) => (
                            <TableHead
                                key={index}
                                className="text-base font-semibold text-gray-800 px-6 py-3 border-b border-gray-200 first:rounded-tl-lg last:rounded-tr-lg transition-all duration-200 hover:bg-gray-100 "
                            >
                                {heading}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allJobs.length > 0 ? allJobs.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell className={"px-5"}>{job.id}</TableCell>
                            <TableCell className={"px-5"}>{job.title}</TableCell>
                            <TableCell className={"px-6"}>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className={"px-6"}>{job.application_count}</TableCell>
                            <TableCell className={"px-6"}>{job.openings}</TableCell>
                            <TableCell className={"px-6"}>
                                {new Date(job.deadline).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="flex gap-2 px-6">
                                <RecruitmentJobView job={job} setRefresh={setRefresh} refresh={refresh} />
                                <RecruitmentJobEdit job={job} setRefresh={setRefresh} />
                                <RecruitmentJobDelete id={job.id} setRefresh={setRefresh} />
                            </TableCell>
                        </TableRow>
                    )) : <TableRow >
                        <TableCell colSpan={7} className={"px-5 font-semibold text-red-700"}>No Jobs Posted!</TableCell>
                    </TableRow>}

                </TableBody>
            </Table>
        </div>
    )
}

export default RecruitmentTable

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const headings = [
    "Job ID",
    "Job Title",
    "Date Posted",
    "Total Applicants",
    "Openings",
    "Deadline",
    "Actions",
]

const RecruitmentTable = () => {
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
                    <TableRow >
                        <TableCell className={"px-5"}>1</TableCell>
                        <TableCell className={"px-5"}>Software Engineer</TableCell>
                        <TableCell className={"px-6"}>24/5/2025</TableCell>
                        <TableCell className={"px-6"}>53</TableCell>
                        <TableCell className={"px-6"}>4</TableCell>
                        <TableCell className={"px-6"}>
                            27/5/2025
                        </TableCell>
                        <TableCell className="flex gap-2 px-6">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default RecruitmentTable

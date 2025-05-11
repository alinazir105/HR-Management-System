import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import LeaveRequestCancel from './LeaveRequestCancel';
import { Badge } from '@/components/ui/badge';

const headings = [
    "Leave Type",
    "Start Date",
    "End Date",
    "Reason",
    "Status",
    "HR's Remarks",
    "Actions"
];


const LeaveRequestsTable = ({ allLeaves, setRefreshData }) => {
    return (
        <div className='mt-6 mb-6'>
            <div className="overflow-auto max-h-[70vh] rounded-lg border border-gray-300 ">
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
                        {allLeaves[0].id == null &&
                            <TableRow>

                                <TableCell colSpan={7} className="px-4 py-4 text-center font-semibold text-red-700 text-lg">
                                    No leave records found!
                                </TableCell>
                            </TableRow>
                        }
                        {allLeaves[0].id !== null && allLeaves.map((row, index) => (
                            <TableRow
                                key={index}
                                className={"text-[1rem] px-4 py-2 hover:bg-transparent"}
                            >
                                <TableCell className="px-5 py-2">
                                    {row.leavetype}
                                </TableCell>
                                <TableCell className="px-5 py-2">
                                    {row.startdate}
                                </TableCell>
                                <TableCell className="px-5 py-2">
                                    {row.enddate}
                                </TableCell>
                                <TableCell className="px-5 py-2">
                                    {row.reason}
                                </TableCell>
                                <TableCell className="px-5 py-2">
                                    <Badge className={`capitalize ${row.status == "rejected" ? "border border-red-600 bg-red-50 text-red-500" : row.status == "pending" ? "border border-yellow-600 bg-yellow-50 text-yellow-500" : "border border-green-600 bg-green-50 text-green-500"}`}>
                                        {row.status}
                                    </Badge>

                                </TableCell>
                                <TableCell className="px-6 py-2">
                                    {row.hrremarks || "N/A"}
                                </TableCell>
                                {row.status == 'pending' &&
                                    <TableCell className={"px-4 py-2"}>
                                        <LeaveRequestCancel leaveID={row.id} setRefreshData={setRefreshData} />
                                    </TableCell>
                                }


                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default LeaveRequestsTable

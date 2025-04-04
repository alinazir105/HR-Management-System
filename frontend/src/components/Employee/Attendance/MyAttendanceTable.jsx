import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

const headings = [
    "Date",
    "Check-in Time",
    "Check-out Time",
    "Hours worked",
    "Status",
];


const MyAttendanceTable = ({ allAttendance }) => {

    return (
        <div className='mt-8 mb-6'>
            <div className="overflow-auto max-h-[70vh] rounded-lg border border-gray-300 ">
                <Table>
                    <TableHeader>
                        <TableRow className={"hover:bg-tranparent"}>
                            {headings.map((heading, index) => (
                                <TableHead
                                    key={index}
                                    className={"text-lg font-semibold px-4 py-2 bg-gray-300"}
                                >
                                    {heading}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allAttendance.length === 0 &&
                            <TableCell colSpan={5} className="px-4 py-4 text-center font-semibold text-red-700 text-lg">
                                No attendance found!
                            </TableCell>
                        }
                        {allAttendance.length > 0 && allAttendance.map((row, index) => (
                            <TableRow
                                key={index}
                                className={"text-[1rem] px-4 py-2 hover:bg-transparent"}
                            >
                                {Object.values(row).map((value, i) => (
                                    <TableCell key={i} className="px-4 py-2">
                                        {value}
                                    </TableCell>
                                ))}
                            </TableRow>
                            // One button for employee to address incorrect attendance. just an idea
                        ))}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MyAttendanceTable

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    { month: 'Jan 2024', rating: 3.8, reviewer: 'HR Manager' },
    { month: 'Apr 2024', rating: 4.0, reviewer: 'Team Lead' },
    { month: 'Jul 2024', rating: 4.2, reviewer: 'HR Manager' },
    { month: 'Oct 2024', rating: 4.1, reviewer: 'Team Lead' },
    { month: 'Jan 2025', rating: 4.5, reviewer: 'HR Manager' },
    { month: 'Apr 2025', rating: 4.3, reviewer: 'HR Manager' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { rating, reviewer } = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 shadow-sm p-3 rounded text-sm text-gray-700">
                <p className="font-semibold">{label}</p>
                <p>Rating: {rating}</p>
                <p>Reviewer: {reviewer}</p>
            </div>
        );
    }
    return null;
};

const PerformanceGraphBlock = () => {
    return (
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg mt-6 border border-neutral-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Performance This Year
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} tickCount={6} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceGraphBlock;

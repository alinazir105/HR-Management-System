import {
    ResponsiveContainer,
    LineChart,
    BarChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { rating, reviewer } = payload[0].payload;
        return (
            <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
                <p className="font-semibold">{label}</p>
                <p>Rating: {rating}</p>
                <p>Reviewer: {reviewer}</p>
            </div>
        );
    }
    return null;
};

const PerformanceGraphBlock = ({ performanceReviews }) => {
    const currentYear = new Date().getFullYear();

    const filteredReviews = performanceReviews.filter((review) => {
        const reviewDate = new Date(review.reviewed_at);
        return reviewDate.getFullYear() === currentYear;
    });

    const isSingleReview = filteredReviews.length === 1;

    return (
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg mt-6 border border-neutral-100 transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Performance This Year
            </h3>
            {filteredReviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews found for {currentYear}.</p>
            ) : (
                <ResponsiveContainer width="100%" height={260}>
                    {isSingleReview ? (
                        <BarChart data={filteredReviews}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis domain={[0, 5]} tickCount={6} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="rating" fill="#2563eb" barSize={40} />
                        </BarChart>
                    ) : (
                        <LineChart data={filteredReviews}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="period" />
                            <YAxis domain={[0, 5]} tickCount={6} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default PerformanceGraphBlock;

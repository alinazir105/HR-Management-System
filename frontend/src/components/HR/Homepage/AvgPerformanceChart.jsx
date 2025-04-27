import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";

const chartConfig = {
  average_rating: {
    label: "Avg Rating",
    color: "#2563eb",
  },
};

export function AvgPerformanceChart() {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to calculate average of an array
  const calculateAverage = (ratings) => {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return parseFloat((sum / ratings.length).toFixed(2));
  };

  // Fetch chart data
  const fetchChartData = async () => {
    try {
      const response = await api.get("/hrDashboard/performance-chart", {
        withCredentials: true,
      });

      const rawData = response.data.filter(
        (item) => item.average_rating != null
      );

      // Grouping by quarter
      const quarterGroups = rawData.reduce((groups, item) => {
        if (item.average_rating) {
          groups[item.quarter] = groups[item.quarter] || [];
          groups[item.quarter].push(parseFloat(item.average_rating));
        }
        return groups;
      }, {});

      // Calculating averages per quarter
      const formattedData = Object.entries(quarterGroups).map(
        ([quarter, ratings]) => ({
          quarter,
          average_rating: calculateAverage(ratings),
        })
      );

      setChartData(formattedData);
    } catch (error) {
      console.error("Failed to fetch performance chart data", error);
      setError("Failed to load data, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <LineChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="quarter"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis domain={[0, 5]} tickCount={6} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="average_rating"
          stroke="var(--color-average_rating)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

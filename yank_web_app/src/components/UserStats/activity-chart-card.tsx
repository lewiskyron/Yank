"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import { weeklyReviewInsights } from "@/api/supabase/statsAdapter";
import { useEffect, useState } from "react";
import { type User } from "@supabase/supabase-js";

interface ActivityChartProps {
	user: User | null;
}

// Helper function to get the last 7 day
const getLast7Days = (customData?: number[]) => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const today = new Date();
	// const patternData = [8, 12, 15, 20, 18, 5, 7];
	const patternData = customData || [0, 0, 0, 0, 0, 0, 0];
	console.log(patternData);

	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const date = new Date(today);
		date.setDate(date.getDate() - (6 - i));
		const dayName = days[date.getDay()];

		return {
			day: i === 6 ? "Today" : dayName,
			cards: patternData[i],
			date: `${date.getMonth() + 1}/${date.getDate()}`,
		};
	});
	return last7Days;
};

// Custom tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-md border border-gray-200 bg-white p-2 text-sm shadow-sm">
				<p className="font-medium">{`${label} (${payload[0].payload.date})`}</p>
				<p className="text-[#4F46E5]">{`${payload[0].value} cards reviewed`}</p>
			</div>
		);
	}
	return null;
};

export default function ActivityChartCard({ user }: ActivityChartProps) {
	const [chartData, setChartData] = useState(getLast7Days());
	const average = Math.round(
		chartData.reduce((acc, day) => acc + day.cards, 0) / 7,
	);
	const maxValue = Math.max(...chartData.map((day) => day.cards));
	const yAxisMax = Math.ceil(maxValue / 5) * 5;

	useEffect(() => {
		weeklyReviewInsights(user?.id || "").then((response) => {
			const patternData: Array<number> = [0, 0, 0, 0, 0, 0, 0];
			if (response.statusCode === 200 && response.data) {
				const dateStrings: string[] = [];
				for (let i = 6; i >= 0; i--) {
					const date = new Date();
					const offset = date.getTimezoneOffset(); // Offset in minutes
					date.setTime(date.getTime() - offset * 60 * 1000); // Adjust for the offset
					date.setDate(date.getDate() - i);
					dateStrings.push(date.toISOString().split("T")[0]);
				}

				// Group and sum entries by date
				response.data.forEach((entry) => {
					const index = dateStrings.indexOf(entry.date_key);
					if (index !== -1) {
						patternData[index] += entry.cards_reviewed;
					}
				});
				setChartData(getLast7Days(patternData));
			} else {
				console.error("Error fetching weekly review insights:", response.error);
			}
		});
	}, []);

	return (
		<Card className="w-full">
			<CardHeader className="pb-4">
				<div className="space-y-1">
					<div className="text-muted-foreground text-sm">Average</div>
					<div className="flex items-baseline gap-2">
						<CardTitle className="text-4xl font-bold text-[#4F46E5]">
							{average}
						</CardTitle>
						<span className="text-muted-foreground text-2xl">cards</span>
					</div>
					<div className="text-muted-foreground text-sm">Last 7 days</div>
				</div>
			</CardHeader>
			<CardContent className="pb-4">
				<div className="h-[250px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={chartData}
							margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="day"
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={{ stroke: "#e0e0e0" }}
								label={{
									value: "Day of Week",
									position: "insideBottom",
									offset: -5,
									fontSize: 12,
									fill: "#888888",
								}}
							/>
							<YAxis
								stroke="#888888"
								fontSize={12}
								tickLine={false}
								axisLine={{ stroke: "#e0e0e0" }}
								domain={[0, yAxisMax]}
								label={{
									value: "Cards Reviewed",
									angle: -90,
									position: "insideLeft",
									style: { textAnchor: "middle" },
									fontSize: 12,
									fill: "#888888",
								}}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="cards"
								name="Cards Reviewed"
								fill="#4F46E5"
								radius={[4, 4, 0, 0]} // Rounded top corners
								barSize={30}
							/>
							<Legend verticalAlign="top" height={36} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="text-muted-foreground mt-4 text-sm">
					<p className="flex justify-between">
						<span>
							Lowest: {Math.min(...chartData.map((d) => d.cards))} cards
						</span>
						<span>
							Highest: {Math.max(...chartData.map((d) => d.cards))} cards
						</span>
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import StatCard from "./StatCard";

interface OrderChartProps {
  data: number[];
  lastWeekData: number[];
  orderCount: number;
  orderChangePercent: number;
}

const DAYS = ["01", "02", "03", "04", "05", "06"];

export default function OrderChart({
  data,
  lastWeekData,
  orderCount,
  orderChangePercent,
}: OrderChartProps) {
  const chartData = DAYS.map((day, i) => ({
    day,
    thisWeek: data[i] ?? 0,
    lastWeek: lastWeekData[i] ?? 0,
  }));

  const isPositive = orderChangePercent >= 0;

  return (
    <StatCard title="Order">
      {/* Stats row */}
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl font-bold text-gray-900">
          {orderCount.toLocaleString().replace(",", ".")}
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5"
          style={{
            backgroundColor: isPositive ? "#E6F9F0" : "#FFF0F0",
            color: isPositive ? "#1DB87B" : "#FF4D4F",
          }}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(orderChangePercent)}%
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">Sales from 1–6 Dec, 2020</p>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={120}>
        <LineChart
          data={chartData}
          margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#E4E4F5"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#AEAEC0" }}
            axisLine={false}
            tickLine={false}
          />
          <Line
            type="monotone"
            dataKey="lastWeek"
            stroke="#E4E4F5"
            strokeWidth={2}
            strokeLinecap="round"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="thisWeek"
            stroke="#6C5DD3"
            strokeWidth={2.5}
            strokeLinecap="round"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3">
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#6C5DD3" }}
          />
          <span className="text-xs text-gray-500">Last 6 days</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "#E4E4F5" }}
          />
          <span className="text-xs text-gray-500">Last Week</span>
        </div>
      </div>
    </StatCard>
  );
}

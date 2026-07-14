import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import StatCard from "./StatCard";

interface RevenueChartProps {
  data: number[];
  lastWeekData: number[];
  revenue: number;
  revenueChangePercent: number;
}

function formatIDR(value: number): string {
  return (
    "IDR " +
    value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

const DAYS = ["01","02","03","04","05","06","07","08","09","10","11","12"];

// Custom rounded bar shape
function RoundedBar(props: any) {
  const { x, y, width, height, fill } = props;
  const radius = 4;
  if (height <= 0) return null;
  return (
    <g>
      <path
        d={`M${x},${y + height} L${x},${y + radius} Q${x},${y} ${x + radius},${y} L${x + width - radius},${y} Q${x + width},${y} ${x + width},${y + radius} L${x + width},${y + height} Z`}
        fill={fill}
      />
    </g>
  );
}

export default function RevenueChart({
  data,
  lastWeekData,
  revenue,
  revenueChangePercent,
}: RevenueChartProps) {
  const chartData = DAYS.map((day, i) => ({
    day,
    thisWeek: data[i] ?? 0,
    lastWeek: lastWeekData[i] ?? 0,
  }));

  const isPositive = revenueChangePercent >= 0;

  return (
    <StatCard title="Revenue">
      {/* Stats row */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-gray-900">
          {formatIDR(revenue)}
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5"
          style={{
            backgroundColor: isPositive ? "#E6F9F0" : "#FFF0F0",
            color: isPositive ? "#1DB87B" : "#FF4D4F",
          }}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(revenueChangePercent)}%
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">Sales from 1–12 Dec, 2020</p>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={chartData}
          barCategoryGap="30%"
          barGap={3}
          margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
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
          <Bar dataKey="lastWeek" fill="#E4E4F5" shape={<RoundedBar />} />
          <Bar dataKey="thisWeek" fill="#6C5DD3" shape={<RoundedBar />} />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#6C5DD3" }} />
          <span className="text-xs text-gray-500">Last 6 days</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E4E4F5" }} />
          <span className="text-xs text-gray-500">Last Week</span>
        </div>
      </div>
    </StatCard>
  );
}

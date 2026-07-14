import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import StatCard from "./StatCard";

export interface OrderTimeSegment {
  label: string;
  percent: number;
  color: string;
  timeRange?: string;
  orderCount?: number;
}

interface OrderTimeChartProps {
  segments: OrderTimeSegment[];
  highlighted: OrderTimeSegment & { timeRange: string; orderCount: number };
}

export default function OrderTimeChart({
  segments,
  highlighted,
}: OrderTimeChartProps) {
  return (
    <StatCard title="Order Time" subtext="From 1–6 Dec, 2020">
      {/* Donut + tooltip container */}
      <div className="relative flex items-center justify-center" style={{ height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="percent"
              nameKey="label"
              innerRadius={55}
              outerRadius={85}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              strokeWidth={0}
            >
              {segments.map((seg, i) => (
                <Cell key={i} fill={seg.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Absolutely positioned tooltip card */}
        <div
          className="absolute pointer-events-none rounded-xl px-4 py-3 flex flex-col items-center text-center"
          style={{
            backgroundColor: "#2B2148",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "120px",
            boxShadow: "0 16px 40px rgba(43, 33, 72, 0.18)",
          }}
        >
          <span className="text-white font-bold text-sm">{highlighted.label}</span>
          <span className="text-purple-200 text-xs mt-0.5">{highlighted.timeRange}</span>
          <span className="text-white text-xs font-semibold mt-1">
            {highlighted.orderCount.toLocaleString()} orders
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around mt-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-xs text-gray-500">{seg.label}</span>
            <span className="text-xs font-semibold text-gray-700">{seg.percent}%</span>
          </div>
        ))}
      </div>
    </StatCard>
  );
}

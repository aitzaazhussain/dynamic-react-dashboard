import type { CSSProperties } from "react";
import StatCard from "./StatCard";

export interface RatingItem {
  label: string;
  percent: number;
  color: string;
}

interface RatingBubblesProps {
  ratings: RatingItem[];
}

interface BubbleProps {
  value: number;
  label: string;
  bgColor: string;
  size: number;
  zIndex?: number;
  style?: CSSProperties;
}

const RatingBubble = ({ value, label, bgColor, size, zIndex = 1, style }: BubbleProps) => (
  <div
    className="absolute flex flex-col items-center justify-center rounded-full select-none"
    style={{
      width: size,
      height: size,
      backgroundColor: bgColor,
      zIndex,
      ...style,
    }}
  >
    <span className="text-[22px] font-bold text-white leading-none">{value}%</span>
    <span className="text-[11px] font-medium text-white/90 mt-1">{label}</span>
  </div>
);

function getBubbleSize(percent: number): number {
  const min = 80;
  const max = 100;
  const minSize = 110;
  const maxSize = 170;
  const clamped = Math.max(min, Math.min(max, percent));
  return minSize + ((clamped - min) / (max - min)) * (maxSize - minSize);
}

export default function RatingBubbles({ ratings }: RatingBubblesProps) {
  const hygiene = ratings[0];
  const foodTaste = ratings[1];
  const packaging = ratings[2];

  return (
    <StatCard title="Your Rating" subtext="Customer satisfaction scores">
      <div className="relative flex-1" style={{ minHeight: 240 }}>
        <RatingBubble
          value={hygiene?.percent ?? 0}
          label="Hygiene"
          bgColor={hygiene?.color ?? "#6C5DD3"}
          size={128}
          zIndex={2}
          style={{ top: 10, left: 10 }}
        />

        <RatingBubble
          value={foodTaste?.percent ?? 0}
          label="Food Taste"
          bgColor={foodTaste?.color ?? "#F5A623"}
          size={142}
          zIndex={3}
          style={{ top: 14, left: 90 }}
        />

        <RatingBubble
          value={packaging?.percent ?? 0}
          label="Packaging"
          bgColor={packaging?.color ?? "#3DCFC0"}
          size={128}
          zIndex={1}
          style={{ top: 110, left: 16 }}
        />
      </div>
    </StatCard>
  );
}

import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import RevenueChart from "./components/dashboard/RevenueChart";
import OrderTimeChart, {
  OrderTimeSegment,
} from "./components/dashboard/OrderTimeChart";
import RatingBubbles, { RatingItem } from "./components/dashboard/RatingBubbles";
import MostOrderedFood, {
  FoodItem,
} from "./components/dashboard/MostOrderedFood";
import OrderChart from "./components/dashboard/OrderChart";
import ControlPanel from "./components/controls/ControlPanel";

// ── Initial data ──────────────────────────────────────────────────────────────

const INITIAL_REVENUE_DAILY: number[] = [
  420, 680, 510, 790, 620, 870, 530, 710, 640, 580, 750, 690,
];
const INITIAL_REVENUE_LAST_WEEK: number[] = [
  320, 490, 380, 560, 440, 700, 410, 590, 520, 460, 610, 550,
];
const INITIAL_ORDER_DAILY: number[] = [380, 520, 410, 670, 490, 730];
const INITIAL_ORDER_LAST_WEEK: number[] = [290, 410, 320, 550, 380, 610];

const INITIAL_ORDER_TIME_SEGMENTS: OrderTimeSegment[] = [
  { label: "Afternoon", percent: 40, color: "#6C5DD3", timeRange: "1pm – 4pm", orderCount: 1890 },
  { label: "Evening",   percent: 32, color: "#8B7CF0", timeRange: "5pm – 8pm", orderCount: 1512 },
  { label: "Morning",   percent: 28, color: "#C9C2F5", timeRange: "7am – 11am", orderCount: 1323 },
];

const INITIAL_RATINGS: RatingItem[] = [
  { label: "Hygiene",    percent: 85, color: "#6C5DD3" },
  { label: "Food Taste", percent: 85, color: "#F5A623" },
  { label: "Packaging",  percent: 92, color: "#3DCFC0" },
];

const MOST_ORDERED_ITEMS: FoodItem[] = [
  { image: "/images/burger.jpg",    name: "Delicious Burger",     price: 45000 },
  { image: "/images/fries.jpg",     name: "Crispy French Fries",  price: 25000 },
  { image: "/images/milkshake.jpg", name: "Chocolate Milkshake",  price: 35000 },
];

export default function App() {
  // ── ALL state lives here ───────────────────────────────────────────────────
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Revenue
  const [revenue, setRevenue] = useState(7852000);
  const [revenueChangePercent, setRevenueChangePercent] = useState(2.5);
  const [revenueDaily, setRevenueDaily] = useState<number[]>(INITIAL_REVENUE_DAILY);
  const [revenueLastWeek] = useState<number[]>(INITIAL_REVENUE_LAST_WEEK);

  // Order Time
  const [orderTimeSegments, setOrderTimeSegments] = useState<OrderTimeSegment[]>(
    INITIAL_ORDER_TIME_SEGMENTS
  );

  // Ratings
  const [ratings, setRatings] = useState<RatingItem[]>(INITIAL_RATINGS);

  // Most ordered (static for this demo)
  const [mostOrderedItems] = useState<FoodItem[]>(MOST_ORDERED_ITEMS);

  // Orders
  const [orderCount, setOrderCount] = useState(2568);
  const [orderChangePercent, setOrderChangePercent] = useState(-3.2);
  const [orderDaily, setOrderDaily] = useState<number[]>(INITIAL_ORDER_DAILY);
  const [orderLastWeek] = useState<number[]>(INITIAL_ORDER_LAST_WEEK);

  // ── Derived: highlighted segment (highest percent) ─────────────────────────
  const highlighted = [...orderTimeSegments].sort(
    (a, b) => b.percent - a.percent
  )[0] as OrderTimeSegment & { timeRange: string; orderCount: number };

  // ── Handlers for ControlPanel (all call setState, never own state) ─────────
  function handleRevenueDailyChange(index: number, value: number) {
    setRevenueDaily((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleOrderTimeSegmentChange(index: number, percent: number) {
    setOrderTimeSegments((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], percent };
      return next;
    });
  }

  function handleRatingChange(index: number, percent: number) {
    setRatings((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], percent };
      return next;
    });
  }

  function handleOrderDailyChange(index: number, value: number) {
    setOrderDaily((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F7F7FC" }}>
      {/* ── Sidebar ── */}
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />

      {/* ── Main content (offset by sidebar width) ── */}
      <div className="flex flex-col flex-1" style={{ marginLeft: "220px" }}>
        {/* ── Topbar ── */}
        <Topbar
          restaurantName="Delicious Burger"
          avatarUrl="/images/avatar.jpg"
        />

        {/* ── Dashboard grid ── */}
        <main className="flex-1 p-6 flex flex-col gap-6">
          {/* Page title */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Welcome back! Here's what's happening at Delicious Burger.
            </p>
          </div>

          {/* Row 1: RevenueChart (wide) + OrderTimeChart (narrow) */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
            <RevenueChart
              data={revenueDaily}
              lastWeekData={revenueLastWeek}
              revenue={revenue}
              revenueChangePercent={revenueChangePercent}
            />
            <OrderTimeChart
              segments={orderTimeSegments}
              highlighted={{
                ...highlighted,
                timeRange: highlighted?.timeRange ?? "1pm – 4pm",
                orderCount: highlighted?.orderCount ?? 1890,
              }}
            />
          </div>

          {/* Row 2: RatingBubbles + MostOrderedFood + OrderChart */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <RatingBubbles ratings={ratings} />
            <MostOrderedFood items={mostOrderedItems} />
            <OrderChart
              data={orderDaily}
              lastWeekData={orderLastWeek}
              orderCount={orderCount}
              orderChangePercent={orderChangePercent}
            />
          </div>

          {/* ── Data-flow callout ── */}
          <div
            className="rounded-2xl p-5 text-xs leading-relaxed border"
            style={{
              backgroundColor: "#EDE9FF",
              borderColor: "#C4B8F5",
              color: "#4B3BB0",
            }}
          >
            <strong>Data-flow pattern:</strong> Typing into a Control Panel input fires{" "}
            <code className="bg-white/60 rounded px-1">onChange</code>, which calls the setter
            prop passed down from <code className="bg-white/60 rounded px-1">App.tsx</code> (e.g.{" "}
            <code className="bg-white/60 rounded px-1">setRevenueDaily</code>). That setter updates
            the <code className="bg-white/60 rounded px-1">useState</code> value in App.tsx. React
            re-renders App.tsx, passing the new array down as the{" "}
            <code className="bg-white/60 rounded px-1">data</code> prop to the chart. Recharts receives
            the new prop and redraws — no chart ever stores its own data. State flows downward through
            props only.
          </div>

          {/* ── Control Panel ── */}
          <ControlPanel
            revenue={revenue}
            onRevenueChange={setRevenue}
            revenueChangePercent={revenueChangePercent}
            onRevenueChangePercentChange={setRevenueChangePercent}
            revenueDaily={revenueDaily}
            onRevenueDailyChange={handleRevenueDailyChange}
            orderTimeSegments={orderTimeSegments}
            onOrderTimeSegmentChange={handleOrderTimeSegmentChange}
            ratings={ratings}
            onRatingChange={handleRatingChange}
            orderCount={orderCount}
            onOrderCountChange={setOrderCount}
            orderChangePercent={orderChangePercent}
            onOrderChangePercentChange={setOrderChangePercent}
            orderDaily={orderDaily}
            onOrderDailyChange={handleOrderDailyChange}
          />
        </main>
      </div>
    </div>
  );
}

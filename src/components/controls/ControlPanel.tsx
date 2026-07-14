import { OrderTimeSegment } from "../dashboard/OrderTimeChart";
import { RatingItem } from "../dashboard/RatingBubbles";

interface ControlPanelProps {
  // Revenue
  revenue: number;
  onRevenueChange: (v: number) => void;
  revenueChangePercent: number;
  onRevenueChangePercentChange: (v: number) => void;
  revenueDaily: number[];
  onRevenueDailyChange: (index: number, value: number) => void;

  // Order Time
  orderTimeSegments: OrderTimeSegment[];
  onOrderTimeSegmentChange: (index: number, percent: number) => void;

  // Ratings
  ratings: RatingItem[];
  onRatingChange: (index: number, percent: number) => void;

  // Orders
  orderCount: number;
  onOrderCountChange: (v: number) => void;
  orderChangePercent: number;
  onOrderChangePercentChange: (v: number) => void;
  orderDaily: number[];
  onOrderDailyChange: (index: number, value: number) => void;
}

export default function ControlPanel({
  revenue,
  onRevenueChange,
  revenueChangePercent,
  onRevenueChangePercentChange,
  revenueDaily,
  onRevenueDailyChange,
  orderTimeSegments,
  onOrderTimeSegmentChange,
  ratings,
  onRatingChange,
  orderCount,
  onOrderCountChange,
  orderChangePercent,
  onOrderChangePercentChange,
  orderDaily,
  onOrderDailyChange,
}: ControlPanelProps) {
  const orderTimeSum = orderTimeSegments.reduce((s, seg) => s + seg.percent, 0);
  const sumIsOff = orderTimeSum !== 100;

  return (
    <div
      className="bg-white rounded-2xl p-6 border-2"
      style={{
        borderColor: "#6C5DD3",
        boxShadow: "0 2px 12px rgba(108,93,211,0.1)",
      }}
    >
      <h2 className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "#6C5DD3" }}
        />
        Control Panel — Live Data Editor
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* ── REVENUE ── */}
        <section>
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#6C5DD3" }}
          >
            Revenue
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Total Revenue (IDR)
              </label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => onRevenueChange(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                % Change
              </label>
              <input
                type="number"
                value={revenueChangePercent}
                onChange={(e) =>
                  onRevenueChangePercentChange(Number(e.target.value))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-2">Daily bar values (01–12):</p>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i}>
                <label className="block text-xs text-gray-400 mb-1 text-center">
                  {String(i + 1).padStart(2, "0")}
                </label>
                <input
                  type="number"
                  value={revenueDaily[i] ?? 0}
                  onChange={(e) =>
                    onRevenueDailyChange(i, Number(e.target.value))
                  }
                  className="w-full border border-gray-200 rounded-lg px-1 py-1 text-xs text-center focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── ORDER TIME ── */}
        <section>
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#6C5DD3" }}
          >
            Order Time
          </h3>
          <div className="flex flex-col gap-4">
            {orderTimeSegments.map((seg, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">{seg.label}</label>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: seg.color }}
                  >
                    {seg.percent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={seg.percent}
                  onChange={(e) =>
                    onOrderTimeSegmentChange(i, Number(e.target.value))
                  }
                  className="w-full accent-indigo-500"
                />
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="text-gray-500">Sum:</span>
              <span
                className="font-bold"
                style={{ color: sumIsOff ? "#FF4D4F" : "#1DB87B" }}
              >
                {orderTimeSum}%
              </span>
              {sumIsOff && (
                <span className="text-red-400">
                  (should equal 100%)
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── RATINGS ── */}
        <section>
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#6C5DD3" }}
          >
            Rating
          </h3>
          <div className="flex flex-col gap-4">
            {ratings.map((r, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">{r.label}</label>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: r.color }}
                  >
                    {r.percent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={r.percent}
                  onChange={(e) => onRatingChange(i, Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── ORDER ── */}
        <section>
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#6C5DD3" }}
          >
            Order
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Order Count
              </label>
              <input
                type="number"
                value={orderCount}
                onChange={(e) => onOrderCountChange(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                % Change
              </label>
              <input
                type="number"
                value={orderChangePercent}
                onChange={(e) =>
                  onOrderChangePercentChange(Number(e.target.value))
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-2">Daily line values (01–06):</p>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <label className="block text-xs text-gray-400 mb-1 text-center">
                  {String(i + 1).padStart(2, "0")}
                </label>
                <input
                  type="number"
                  value={orderDaily[i] ?? 0}
                  onChange={(e) =>
                    onOrderDailyChange(i, Number(e.target.value))
                  }
                  className="w-full border border-gray-200 rounded-lg px-1 py-1 text-xs text-center focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

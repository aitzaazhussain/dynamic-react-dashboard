import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
  subtext?: string;
  hideAction?: boolean;
}

export default function StatCard({
  title,
  actionLabel = "View Report",
  onAction,
  children,
  subtext,
  hideAction = false,
}: StatCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col"
      style={{ boxShadow: "0 2px 12px rgba(108,93,211,0.07)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {!hideAction && (
          <button
            onClick={onAction}
            className="text-xs font-medium px-4 py-1.5 rounded-full border transition-colors"
            style={{ borderColor: "#6C5DD3", color: "#6C5DD3" }}
          >
            {actionLabel}
          </button>
        )}
      </div>
      {subtext && (
        <p className="text-xs text-gray-400 mb-3">{subtext}</p>
      )}
      {children}
    </div>
  );
}

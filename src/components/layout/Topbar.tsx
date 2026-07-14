import { Search, ChevronDown, Bell } from "lucide-react";

interface TopbarProps {
  restaurantName: string;
  avatarUrl: string;
}

export default function Topbar({ restaurantName, avatarUrl }: TopbarProps) {
  return (
    <header className="w-full bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100">
      {/* Search */}
      <div
        className="flex flex-1 max-w-[420px] items-center gap-2 rounded-full px-4 py-2"
        style={{ backgroundColor: "#F7F7FC", minWidth: "260px" }}
      >
        <Search size={16} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Bell with badge */}
        <div className="relative">
          <Bell size={20} className="text-gray-500" />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
            style={{ backgroundColor: "#FF4D4F" }}
          />
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-2">
          <img
            src={avatarUrl}
            alt={restaurantName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">
            {restaurantName}
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}

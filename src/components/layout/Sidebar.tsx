import {
  LayoutGrid,
  ShoppingCart,
  ClipboardList,
  MessageSquare,
  Settings,
  CreditCard,
  Users,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  activeItem: string;
  onNavigate: (label: string) => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Food Order", icon: ShoppingCart },
  { label: "Manage Menu", icon: ClipboardList },
  { label: "Customer Review", icon: MessageSquare },
];

const otherItems = [
  { label: "Settings", icon: Settings },
  { label: "Payment", icon: CreditCard },
  { label: "Accounts", icon: Users },
  { label: "Help", icon: HelpCircle },
];

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside
      className="fixed top-0 left-0 h-full flex flex-col py-6 px-4 z-20"
      style={{ width: "220px", backgroundColor: "#F7F7FC" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#6C5DD3" }}
        >
          <span className="text-white font-bold text-base">G</span>
        </div>
        <span className="font-bold text-gray-900 text-base tracking-tight">
          GOODFOOD
        </span>
      </div>

      {/* MENU label */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-2">
        Menu
      </p>

      {/* Main nav */}
      <nav className="flex flex-col gap-1 mb-6">
        {menuItems.map(({ label, icon: Icon }) => {
          const isActive = activeItem === label;
          return (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
              style={{
                backgroundColor: isActive ? "#EDE9FF" : "transparent",
                color: isActive ? "#6C5DD3" : "#8A8A9B",
              }}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ backgroundColor: "#6C5DD3" }}
                />
              )}
              <Icon
                size={18}
                style={{ color: isActive ? "#6C5DD3" : "#8A8A9B" }}
              />
              {label}
            </button>
          );
        })}
      </nav>

      {/* OTHERS label */}
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-2">
        Others
      </p>

      {/* Other nav */}
      <nav className="flex flex-col gap-1">
        {otherItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onNavigate(label)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all"
            style={{ color: "#8A8A9B" }}
          >
            <Icon size={18} style={{ color: "#8A8A9B" }} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

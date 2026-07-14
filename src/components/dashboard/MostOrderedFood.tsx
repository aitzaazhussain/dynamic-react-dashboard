import StatCard from "./StatCard";

export interface FoodItem {
  image: string;
  name: string;
  price: number;
}

interface MostOrderedFoodProps {
  items: FoodItem[];
}

function formatPrice(value: number): string {
  return (
    "IDR " +
    value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export default function MostOrderedFood({ items }: MostOrderedFoodProps) {
  return (
    <StatCard
      title="Most Ordered Food"
      subtext="Adipiscing elit, sed do eiusmod tempor"
    >
      <div className="flex flex-col gap-3 mt-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <span className="flex-1 text-sm font-semibold text-gray-800 truncate">
              {item.name}
            </span>
            <span className="text-sm text-gray-400 font-medium whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>
        ))}
      </div>
    </StatCard>
  );
}

import type { Product } from "../../shared/types/product";
import { PriceUtil } from "../../shared/utils/price";

interface PriceStatsProps {
  product: Product;
}

export default function PriceStats({ product }: PriceStatsProps) {
  const history = product.history;

  if (history.length === 0) {
    return null;
  }

  const prices = history.map((entry) => entry.price);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const lowestDisplayPrice = PriceUtil.format(
    lowestPrice,
    history.find((entry) => entry.price === lowestPrice)?.displayPrice,
  );

  const highestDisplayPrice = PriceUtil.format(
    highestPrice,
    history.find((entry) => entry.price === highestPrice)?.displayPrice,
  );

  const firstPrice = history[0].price;
  const currentPrice = product.price;

  const percentageChange =
    firstPrice === 0 ? 0 : ((currentPrice - firstPrice) / firstPrice) * 100;

  const latestDisplayPrice =
    history.at(-1)?.displayPrice ?? String(currentPrice);

  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      <Stat label="Current" value={latestDisplayPrice} />

      <Stat label="Lowest" value={lowestDisplayPrice} />

      <Stat label="Highest" value={highestDisplayPrice} />

      <div className="col-span-3 rounded-lg bg-slate-50 p-3 text-center">
        <p className="text-xs text-slate-500">Since tracking</p>

        <p
          className={`mt-1 text-sm font-bold ${
            percentageChange < 0
              ? "text-green-600"
              : percentageChange > 0
                ? "text-red-600"
                : "text-slate-700"
          }`}
        >
          {percentageChange > 0 ? "+" : ""}
          {percentageChange.toFixed(1)}%
        </p>
      </div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-2 text-center">
      <p className="text-xs text-slate-500">{label}</p>

      <p className="mt-1 truncate text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

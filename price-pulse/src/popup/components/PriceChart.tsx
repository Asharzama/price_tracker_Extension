import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Product } from "../../shared/types/product";

interface PriceChartProps {
  product: Product;
}

export default function PriceChart({ product }: PriceChartProps) {
  const data = product.history.map((entry) => ({
    date: new Date(entry.checkedAt).toLocaleDateString(),
    price: entry.price,
  }));

  if (data.length < 2) {
    return (
      <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center text-xs text-slate-500">
        Price history will appear after the next price check.
      </div>
    );
  }

  return (
    <div className="mt-4 h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />

          <YAxis tick={{ fontSize: 10 }} width={50} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="currentColor"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

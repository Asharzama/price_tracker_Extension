import type { Product } from "../../shared/types/product";
import PriceStats from "./PriceStats";
import PriceChart from "./PriceChart";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
}

export default function ProductCard({ product, onRemove }: ProductCardProps) {
  const handleOpenProduct = async () => {
    await chrome.tabs.create({
      url: product.url,
    });
  };

  const lowestPrice = Math.min(...product.history.map((entry) => entry.price));

  const isLowestPrice = product.price === lowestPrice;

  const lastChecked = product.history.at(-1)?.checkedAt;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <PriceStats product={product} />
      <PriceChart product={product} />
      {isLowestPrice && (
        <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          🔥 Lowest price
        </span>
      )}
      <div className="flex gap-3">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="h-16 w-16 rounded-lg object-contain"
          />
        )}

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
            {product.title}
          </h3>

          <p className="mt-1 text-lg font-bold text-slate-900">
            {product.history.at(-1)?.displayPrice ?? product.price}
          </p>

          <p className="text-xs text-slate-500">{product.website}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleOpenProduct}
          className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Open Product
        </button>

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          Remove
        </button>
      </div>
      {lastChecked && (
        <p className="mt-2 text-xs text-slate-400">
          Last checked {new Date(lastChecked).toLocaleString()}
        </p>
      )}
    </article>
  );
}

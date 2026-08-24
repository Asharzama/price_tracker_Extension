import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import TrackButton from "./components/TrackButton";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import type { Product } from "../shared/types/product";
import { PriceUtil } from "../shared/utils/price";
import { useEffect, useState } from "react";
import { useCurrentProduct } from "./hooks/useCurrentProduct";
import { TrackingService } from "../shared/services/tracking.service";
import { StorageService } from "../shared/storage/storage";

export default function Popup() {
  const { product, loading } = useCurrentProduct();

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const storedProducts = await StorageService.getProducts();

        setProducts(storedProducts);
      } finally {
        setProductsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleRemove = async (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);

    await StorageService.saveProducts(updatedProducts);

    setProducts(updatedProducts);
  };

  const handleTrack = async () => {
    if (!product) {
      alert("No product detected.");
      return;
    }

    if (await TrackingService.isTracked(product.url)) {
      alert("Already tracking this product.");
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      title: product.title,
      price: PriceUtil.parse(product.price),
      website: product.website,

      url: product.url,

      image: product.image,

      createdAt: Date.now(),

      history: [
        {
          price: PriceUtil.parse(product.price),

          displayPrice: product.price,

          checkedAt: Date.now(),
        },
      ],
    };

    await TrackingService.trackProduct(newProduct);

    const products = await TrackingService.getTrackedProducts();

    setProducts(products);

    console.log("Tracked Products:", products);
    console.log("Count:", products.length);

    alert("Product added successfully!");
  };

  return (
    <main className="flex min-h-[500px] w-[360px] flex-col bg-slate-50">
      <Header title="🟢 PricePulse" subtitle="Your Smart Price Tracker" />

      <section className="flex flex-1 flex-col gap-4 p-4">
        <InfoCard label="Website" value={product?.website ?? "--"} />

        {loading ? (
          <InfoCard label="Image" value="Loading..." />
        ) : product?.image ? (
          <div>
            <p className="text-xs font-medium text-slate-500">Image</p>

            <img
              src={product.image}
              alt={product.title}
              className="mt-2 h-24 w-full rounded-lg object-contain bg-white"
            />
          </div>
        ) : (
          <InfoCard label="Image" value="No Image Detected" />
        )}

        <InfoCard
          label="Product"
          value={
            loading ? "Loading..." : (product?.title ?? "No Product Detected")
          }
        />

        <InfoCard label="Price" value={product?.price ?? "--"} />

        <TrackButton onClick={handleTrack} />
      </section>
      <div className="space-y-3">
        {productsLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <p className="text-sm text-slate-500">
              Loading tracked products...
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No tracked products
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Open a supported product page and track it with PricePulse.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
      <Footer totalTracked={products.length} />
    </main>
  );
}

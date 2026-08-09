import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import TrackButton from "./components/TrackButton";
import Footer from "./components/Footer";

import { StorageService } from "../shared/storage/storage";
import type { Product } from "../shared/types/product";
import { useEffect, useState } from "react";
import { useCurrentProduct } from "./hooks/useCurrentProduct";

export default function Popup() {
  const { product, loading } = useCurrentProduct();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const storedProducts = await StorageService.getProducts();
      setProducts(storedProducts);
    }

    loadProducts();
  }, []);

  const handleTrack = async () => {
    if (!product) {
      alert("No product detected.");
      return;
    }

    const existingProducts = await StorageService.getProducts();

    const newProduct: Product = {
      id: crypto.randomUUID(),
      title: product.title,
      price: product.price ?? 0,
      website: product.website,
      url: product.url,
      image: product.image,
      createdAt: Date.now(),
    };

    const updatedProducts = [...existingProducts, newProduct];

    await StorageService.saveProducts(updatedProducts);

    setProducts(updatedProducts);

    alert("Product added successfully!");
  };

  return (
    <main className="flex min-h-[500px] w-[360px] flex-col bg-slate-50">
      <Header
        title="🟢 PricePulse"
        subtitle="Your Smart Price Tracker"
      />

      <section className="flex flex-1 flex-col gap-4 p-4">
        <InfoCard
          label="Website"
          value={product?.website ?? "--"}
        />

        <InfoCard
          label="Product"
          value={
            loading
              ? "Loading..."
              : product?.title ?? "No Product Detected"
          }
        />

        <InfoCard
          label="Price"
          value={
            product?.price != null
              ? `₹${product.price}`
              : "--"
          }
        />

        <TrackButton onClick={handleTrack} />
      </section>

      <Footer totalTracked={products.length} />
    </main>
  );
}
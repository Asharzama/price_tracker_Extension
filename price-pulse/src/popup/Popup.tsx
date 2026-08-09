import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import TrackButton from "./components/TrackButton";
import Footer from "./components/Footer";

import { StorageService } from "../shared/storage/storage";
import type { Product } from "../shared/types/product";
import { parsePrice } from "../shared/utils/price";
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

  if (await StorageService.isTracked(product.url)) {
    alert("Already tracking this product.");
    return;
  }

  const newProduct: Product = {
  id: crypto.randomUUID(),

  title: product.title,

  website: product.website,

  url: product.url,

  image: product.image,

  createdAt: Date.now(),

  history: [
    {
      price: parsePrice(product.price),

      displayPrice: product.price,

      checkedAt: Date.now(),
    },
  ],
};

  await StorageService.addProduct(newProduct);

  const products = await StorageService.getProducts();

  setProducts(products);

  console.log(products);

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
          label="Image"
          value={
            loading
              ? "Loading..."
              : product?.image ?? "No Image Detected"
          }
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
          value={product?.price ?? "--"}
        />

        <TrackButton onClick={handleTrack} />
      </section>

      <Footer totalTracked={products.length} />
    </main>
  );
}
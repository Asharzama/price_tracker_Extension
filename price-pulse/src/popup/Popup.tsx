import Header from "./components/Header";
import InfoCard from "./components/InfoCard";
import TrackButton from "./components/TrackButton";
import Footer from "./components/Footer";
import { StorageService } from "../services/storage.service";
import type { Product } from "../types/product";
import { useEffect, useState } from "react";
import type { ScrapedProduct } from "../types/scrapedProduct";
import { ProductService } from "../services/product.service";

export default function Popup() {
  const [product, setProduct] = useState<ScrapedProduct | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function loadProduct() {
        const current =
            await ProductService.getCurrentProduct();

        setProduct(current);
    }

    loadProduct();
  }, []);
  
  const handleTrack = async () => {
    const existingProducts = await StorageService.getProducts();

    const newProduct: Product = {
      id: crypto.randomUUID(),
      title: "Test Product",
      price: 999,
      website: "amazon.in",
      url: "https://amazon.in",
      createdAt: Date.now(),
    };

    const updatedProducts = [...existingProducts, newProduct];

    await StorageService.saveProducts(updatedProducts);

    setProducts(updatedProducts);
  };
  return (
    <main className="flex min-h-[500px] w-[360px] flex-col bg-slate-50">
      <Header title="🟢 PricePulse" subtitle="Your Smart Price Tracker" />

      <section className="flex flex-1 flex-col gap-4 p-4">
        <InfoCard label="Website" value="amazon.in" />

        <InfoCard label="Product" value={product?.title ?? "No Product Detected"} />

        <InfoCard label="Price" value="--" />

        <TrackButton onClick={handleTrack} />
      </section>

      <Footer totalTracked={products.length} />
    </main>
  );
}

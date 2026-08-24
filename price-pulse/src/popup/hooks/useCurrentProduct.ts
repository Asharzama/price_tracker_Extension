import { getCurrentProduct } from "../services/product.service";
import { useEffect, useState } from "react";
import type { ScrapedProduct } from "../../shared/types/scrapedProduct";

export function useCurrentProduct() {
  const [product, setProduct] = useState<ScrapedProduct | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      try {
        const currentProduct = await getCurrentProduct();

        if (!cancelled) {
          setProduct(currentProduct);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to get current product:", error);

          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    product,
    loading,
  };
}

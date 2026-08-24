import { useEffect, useState } from "react";
import type { ScrapedProduct } from "../../shared/types/scrapedProduct";
import { getCurrentProduct } from "../services/product.service";

export function useCurrentProduct() {
  const [product, setProduct] = useState<ScrapedProduct | null>(null);

  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);

    const result = await getCurrentProduct();

    setProduct(result);

    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    product,
    loading,
    refresh,
  };
}

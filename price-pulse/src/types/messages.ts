import type { ScrapedProduct } from "./scrapedProduct";

export const MessageType = {
  GET_PRODUCT: "GET_PRODUCT",
} as const;

export interface GetProductResponse {
  product: ScrapedProduct | null;
}
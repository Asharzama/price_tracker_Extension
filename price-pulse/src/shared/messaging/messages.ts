import type { ScrapedProduct } from "../types/scrapedProduct";

export type GetProductMessage = {
  type: "GET_PRODUCT";
};

export type ExtensionMessage = GetProductMessage | CheckPricesMessage;

export type GetProductResponse = {
  product: ScrapedProduct | null;
};

export type CheckPricesMessage = {
  type: "CHECK_PRICES";
};

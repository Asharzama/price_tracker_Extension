import { STORAGE_KEYS } from "../constants/storageKeys";
import type { Product } from "../types/product";

export class StorageService {
  static async getProducts(): Promise<Product[]> {
    const result = await chrome.storage.local.get(
      STORAGE_KEYS.PRODUCTS
    );

    return (result[STORAGE_KEYS.PRODUCTS] as Product[]) ?? [];
  }

  static async saveProducts(products: Product[]): Promise<void> {
    await chrome.storage.local.set({
      [STORAGE_KEYS.PRODUCTS]: products,
    });
  }

  static async clearProducts(): Promise<void> {
    await chrome.storage.local.remove(
      STORAGE_KEYS.PRODUCTS
    );
  }
}
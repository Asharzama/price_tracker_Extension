import { STORAGE_KEYS } from "../constants/storageKeys";
import type { Product } from "../types/product";

export class StorageService {
  static async getProducts(): Promise<Product[]> {
    const result = await chrome.storage.local.get(STORAGE_KEYS.PRODUCTS);

    return (result[STORAGE_KEYS.PRODUCTS] as Product[]) ?? [];
  }

  static async saveProducts(products: Product[]): Promise<void> {
    await chrome.storage.local.set({
      [STORAGE_KEYS.PRODUCTS]: products,
    });
  }

  static async addProduct(product: Product): Promise<void> {
    const products = await this.getProducts();

    products.push(product);

    await this.saveProducts(products);
  }

  static async isTracked(url: string): Promise<boolean> {
    const products = await this.getProducts();

    return products.some((product) => product.url === url);
  }

  static async removeProduct(id: string): Promise<void> {
    const products = await this.getProducts();

    const updated = products.filter((p) => p.id !== id);

    await this.saveProducts(updated);
  }

  static async clearProducts(): Promise<void> {
    await chrome.storage.local.remove(STORAGE_KEYS.PRODUCTS);
  }
}
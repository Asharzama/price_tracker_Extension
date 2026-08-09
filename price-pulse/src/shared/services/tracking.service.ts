import { StorageService } from "../storage/storage";
import type { Product } from "../types/product";

export class TrackingService {
  static async getTrackedProducts(): Promise<Product[]> {
    return StorageService.getProducts();
  }

  static async isTracked(url: string): Promise<boolean> {
    return StorageService.isTracked(url);
  }

  static async trackProduct(product: Product): Promise<void> {
    await StorageService.addProduct(product);
  }

  static async removeTrackedProduct(id: string): Promise<void> {
    await StorageService.removeProduct(id);
  }

  static async clearAll(): Promise<void> {
    await StorageService.clearProducts();
  }
}
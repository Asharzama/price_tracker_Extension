export class PriceUtil {
  static parse(price: string): number {
    const value = price.replace(/[^0-9.,]/g, "");

    return Number(
      value.replace(",", "")
    );
  }
}
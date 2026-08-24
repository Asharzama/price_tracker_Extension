export class PriceUtil {
  static parse(price: string): number {
    const value = price.replace(/[^0-9.,]/g, "");

    return Number(value.replace(/,/g, ""));
  }

  static format(price: number, displayPrice?: string): string {
    if (displayPrice) {
      return displayPrice;
    }

    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}

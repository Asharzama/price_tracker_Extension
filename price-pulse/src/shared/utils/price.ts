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

export function formatPrice(price: number, currency?: string): string {
  if (!currency) {
    return price.toFixed(2);
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}

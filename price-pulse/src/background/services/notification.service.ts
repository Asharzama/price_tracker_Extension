export class NotificationService {
  static async showPriceDrop(
    title: string,
    oldPrice: number,
    newPrice: number,
    newDisplayPrice: string,
  ): Promise<void> {
    const percentageDrop =
      ((oldPrice - newPrice) / oldPrice) * 100;

    await chrome.notifications.create({
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: "PricePulse 🔔",
      message: `${title}\nNow ${newDisplayPrice} — ${percentageDrop.toFixed(1)}% price drop`,
    });
  }
}
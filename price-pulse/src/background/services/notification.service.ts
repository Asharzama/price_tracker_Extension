import type { AlertResult } from "./alert.service";

export class NotificationService {
  static async showPriceDrop(
    title: string,
    oldPrice: number,
    newPrice: number,
    newDisplayPrice: string,
    productUrl: string,
    reason: AlertResult["reason"],
  ): Promise<void> {
    const percentageDrop = ((oldPrice - newPrice) / oldPrice) * 100;

    const notificationId = `price-drop-${crypto.randomUUID()}`;

    const createdId = await chrome.notifications.create(notificationId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/images.png"),
      title: "PricePulse 🔔",
      message:
        `${title}\n` +
        `Now ${newDisplayPrice} — ` +
        `${percentageDrop.toFixed(1)}% price drop`,
    });

    let message: string;

    if (reason === "TARGET_PRICE") {
      message = `${title}\n` + `🎯 Target price reached: ${newDisplayPrice}`;
    } else {
      const percentageDrop = ((oldPrice - newPrice) / oldPrice) * 100;

      message =
        `${title}\n` +
        `Now ${newDisplayPrice} — ` +
        `${percentageDrop.toFixed(1)}% price drop`;
    }
    await chrome.notifications.create(notificationId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: "PricePulse 🔔",
      message,
    });
    console.log("✅ Notification created:", createdId);

    await chrome.storage.local.set({
      [`notification:${notificationId}`]: productUrl,
    });
  }
}

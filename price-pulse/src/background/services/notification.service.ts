export class NotificationService {
  static async showPriceDrop(
    title: string,
    oldPrice: number,
    newPrice: number,
    newDisplayPrice: string,
    productUrl: string,
  ): Promise<void> {
    const percentageDrop = ((oldPrice - newPrice) / oldPrice) * 100;

    const notificationId = `price-drop-${crypto.randomUUID()}`;

    console.log("🔔 Creating notification:", {
      notificationId,
      title,
      oldPrice,
      newPrice,
      newDisplayPrice,
    });

    const createdId = await chrome.notifications.create(notificationId, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/images.png"),
      title: "PricePulse 🔔",
      message:
        `${title}\n` +
        `Now ${newDisplayPrice} — ` +
        `${percentageDrop.toFixed(1)}% price drop`,
    });

    console.log("✅ Notification created:", createdId);

    await chrome.storage.local.set({
      [`notification:${notificationId}`]: productUrl,
    });

    console.log("💾 Notification URL stored");
  }
}

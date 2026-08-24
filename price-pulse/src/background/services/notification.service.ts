export class NotificationService {
  static async showPriceDrop(productUrl: string): Promise<void> {
    const notificationId = `price-drop-${crypto.randomUUID()}`;

    await chrome.storage.local.set({
      [`notification:${notificationId}`]: productUrl,
    });
  }
}

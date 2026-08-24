export class PopupMonitoringService {
  static async checkPrices(): Promise<boolean> {
    const response = await chrome.runtime.sendMessage({
      type: "CHECK_PRICES",
    });

    return response?.success === true;
  }
}

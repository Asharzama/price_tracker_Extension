export class BrowserService {
  static async openHiddenTab(url: string): Promise<number> {
    const tab = await chrome.tabs.create({
      url,
      active: false,
    });

    if (tab.id === undefined) {
      throw new Error("Failed to create tab");
    }

    return tab.id;
  }

  static async getProductFromTab(tabId: number) {
    const response = await chrome.tabs.sendMessage(tabId, {
      type: "GET_PRODUCT",
    });

    return response?.product ?? null;
  }

  static async waitForTabComplete(tabId: number): Promise<void> {
    return new Promise((resolve) => {
      const listener = (
        updatedTabId: number,
        changeInfo: { status?: string },
      ) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };

      chrome.tabs.onUpdated.addListener(listener);
    });
  }

  static async closeTab(tabId: number): Promise<void> {
    await chrome.tabs.remove(tabId);
  }
}

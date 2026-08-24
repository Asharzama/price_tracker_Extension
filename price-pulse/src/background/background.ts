import { ALARM_NAMES } from "../shared/constants/alarms";
import { MonitoringService } from "./services/monitoring.service";

chrome.alarms.create(ALARM_NAMES.PRICE_CHECK, {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAMES.PRICE_CHECK) return;

  await MonitoringService.checkAllProducts();
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "CHECK_PRICES") {
    return;
  }

  MonitoringService.checkAllProducts()
    .then(() => {
      sendResponse({ success: true });
    })
    .catch((error) => {
      console.error("Manual price check failed:", error);

      sendResponse({
        success: false,
      });
    });

  return true;
});

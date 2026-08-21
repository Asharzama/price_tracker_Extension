import { ALARM_NAMES } from "../shared/constants/alarms";
import { MonitoringService } from "./services/monitoring.service";  

chrome.alarms.create(ALARM_NAMES.PRICE_CHECK, {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAMES.PRICE_CHECK) return;

  await MonitoringService.checkAllProducts();
});
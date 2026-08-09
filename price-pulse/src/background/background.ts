console.log("🚀 Background worker loaded!");

chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Extension installed!");

  chrome.alarms.create("test-alarm", {
    periodInMinutes: 1,
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("⏰ Alarm fired:", alarm.name);
});
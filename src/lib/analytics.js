export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window === "undefined") return;

  // Only log analytics events in development — silent in production
  if (process.env.NODE_ENV === "development") {
    const timestamp = new Date().toISOString();
    console.group(`📊 Analytics Event: ${eventName}`);
    console.log("Time:", timestamp);
    if (Object.keys(eventData).length > 0) {
      console.table(eventData);
    }
    console.groupEnd();
  }
};

export const trackPageView = (url) => {
  trackEvent("Page_View", { path: url });
};

export const trackCTA = (ctaName, location) => {
  trackEvent("CTA_Click", { ctaName, location });
};

export const trackDownload = (fileName) => {
  trackEvent("File_Download", { fileName });
};

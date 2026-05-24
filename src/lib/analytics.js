export const trackEvent = (eventName, eventData = {}) => {
  // In a production app, this would send data to Mixpanel, Vercel Analytics, or Plausible.
  // For the portfolio, we log it beautifully to the console to show the recruiter that
  // analytics tracking has been implemented.
  
  if (typeof window === "undefined") return;

  const timestamp = new Date().toISOString();
  
  console.group(`📊 Analytics Event: ${eventName}`);
  console.log("Time:", timestamp);
  if (Object.keys(eventData).length > 0) {
    console.table(eventData);
  }
  console.groupEnd();
  
  // Example of how we might send to a real backend:
  // fetch('/api/analytics/track', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ eventName, eventData, timestamp })
  // }).catch(e => console.error("Analytics failure", e));
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

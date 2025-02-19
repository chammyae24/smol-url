export type UserAgent = {
  browser: { name: string; version: string } | null;
  os: string | null;
  deviceType: string | null;
  deviceModel: string | null;
  architecture: string | null;
};

export const parseUserAgent = (userAgent: string) => {
  const result: UserAgent = {
    browser: null,
    os: null,
    deviceType: null,
    deviceModel: null,
    architecture: null,
  };

  // Browser and version
  const browserRegex =
    /(chrome|safari|firefox|msie|trident|edge|opera|android|crios|fxios)\/?\s*(\d+)/i;
  const browserMatch = userAgent.match(browserRegex);
  if (browserMatch) {
    result.browser = {
      name: browserMatch[1].toLowerCase(),
      version: browserMatch[2],
    };
  }

  // Operating system
  const osRegex = /\(([^)]+)\)/;
  const osMatch = userAgent.match(osRegex);
  if (osMatch) {
    result.os = osMatch[1];
  }

  // Device type (mobile, tablet, desktop)
  const mobileRegex = /mobile/i;
  const tabletRegex = /tablet/i;
  if (mobileRegex.test(userAgent)) {
    result.deviceType = "mobile";
  } else if (tabletRegex.test(userAgent)) {
    result.deviceType = "tablet";
  } else {
    result.deviceType = "desktop";
  }

  // Architecture (32 or 64 bit)
  const archRegex = /x86_64|i686|arm64|aarch64/i;
  const archMatch = userAgent.match(archRegex);
  if (archMatch) {
    result.architecture = archMatch[0];
  }

  return result;
};

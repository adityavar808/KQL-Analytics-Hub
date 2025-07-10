export function getTimeRange(range, customStart, customEnd) {
    const now = new Date();
    let start, end = now;
    switch (range) {
      case "30m": start = new Date(now - 30 * 60 * 1000); break;
      case "1h": start = new Date(now - 60 * 60 * 1000); break;
      case "4h": start = new Date(now - 4 * 60 * 60 * 1000); break;
      case "12h": start = new Date(now - 12 * 60 * 60 * 1000); break;
      case "24h": start = new Date(now - 24 * 60 * 60 * 1000); break;
      case "48h": start = new Date(now - 48 * 60 * 60 * 1000); break;
      case "3d": start = new Date(now - 3 * 24 * 60 * 60 * 1000); break;
      case "7d": start = new Date(now - 7 * 24 * 60 * 60 * 1000); break;
      case "custom":
        if (!customStart || !customEnd) throw new Error("Custom range not set");
        return { StartTime: new Date(customStart).toISOString(), EndTime: new Date(customEnd).toISOString() };
      default: start = new Date(now - 60 * 60 * 1000);
    }
    return { StartTime: start.toISOString(), EndTime: end.toISOString() };
  }
  
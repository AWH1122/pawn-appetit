export function capitalize(str: string) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

// i18next formatter functions
export function createBytesFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string, options?: { decimals?: number }) => {
    const bytes = Math.abs(Number(value));
    const decimals = options?.decimals !== undefined ? options.decimals : 2;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const currentLng = lng || i18n.language;
    const sizes = [
      i18n.t("Units.Bytes.Bytes", { lng: currentLng }),
      i18n.t("Units.Bytes.Kilobytes", { lng: currentLng }),
      i18n.t("Units.Bytes.Megabytes", { lng: currentLng }),
      i18n.t("Units.Bytes.Gigabytes", { lng: currentLng }),
      i18n.t("Units.Bytes.Terabytes", { lng: currentLng }),
    ];

    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    const formattedValue = (bytes / k ** i).toFixed(dm);
    return `${formattedValue} ${sizes[i]}`;
  };
}

export function createBytesLongFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string, options?: { decimals?: number }) => {
    const bytes = Math.abs(Number(value));
    const decimals = options?.decimals || 2;
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const currentLng = lng || i18n.language;
    const sizes = [
      i18n.t("Units.Bytes.BytesLong", { lng: currentLng }),
      i18n.t("Units.Bytes.KilobytesLong", { lng: currentLng }),
      i18n.t("Units.Bytes.MegabytesLong", { lng: currentLng }),
      i18n.t("Units.Bytes.GigabytesLong", { lng: currentLng }),
      i18n.t("Units.Bytes.TerabytesLong", { lng: currentLng }),
    ];

    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    const formattedValue = (bytes / k ** i).toFixed(dm);
    return `${formattedValue} ${sizes[i]}`;
  };
}

export function createNodesFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string) => {
    const nodes = Math.abs(Number(value));
    if (nodes < 1) return nodes.toExponential(2);

    const currentLng = lng || i18n.language;
    const units = [
      "",
      i18n.t("Units.Nodes.Thousand", { lng: currentLng }),
      i18n.t("Units.Nodes.Million", { lng: currentLng }),
      i18n.t("Units.Nodes.Billion", { lng: currentLng }),
      i18n.t("Units.Nodes.Trillion", { lng: currentLng }),
      i18n.t("Units.Nodes.Quadrillion", { lng: currentLng }),
      i18n.t("Units.Nodes.Quintillion", { lng: currentLng }),
    ];
    let i = 0;
    let nodeValue = nodes;

    while (nodeValue >= 1000 && i < units.length - 1) {
      nodeValue /= 1000;
      i++;
    }

    const formattedValue = nodeValue % 1 === 0 ? nodeValue.toFixed(0) : nodeValue.toFixed(1);
    return `${formattedValue}${units[i]}`;
  };
}

export function createNodesLongFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string) => {
    const nodes = Math.abs(Number(value));
    const currentLng = lng || i18n.language;
    return `${nodes.toLocaleString()} ${i18n.t("Units.Nodes.Nodes", { lng: currentLng })}`;
  };
}

export function createDurationFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string) => {
    const ms = Number(value);
    const currentLng = lng || i18n.language;

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const secondsRemainder = seconds % 60;
    const minutesRemainder = minutes % 60;
    const hoursRemainder = hours % 24;
    const parts: string[] = [];
    if (hoursRemainder > 0) parts.push(`${hoursRemainder}${i18n.t("Units.Duration.Hours", { lng: currentLng })}`);
    if (minutesRemainder > 0) parts.push(`${minutesRemainder}${i18n.t("Units.Duration.Minutes", { lng: currentLng })}`);
    if (secondsRemainder > 0) parts.push(`${secondsRemainder}${i18n.t("Units.Duration.Seconds", { lng: currentLng })}`);
    return parts.join(" ") || `0${i18n.t("Units.Duration.Seconds", { lng: currentLng })}`;
  };
}

export function createDurationLongFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string) => {
    const ms = Number(value);
    const currentLng = lng || i18n.language;

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const secondsRemainder = seconds % 60;
    const minutesRemainder = minutes % 60;
    const hoursRemainder = hours % 24;
    const parts: string[] = [];
    if (hoursRemainder > 0) parts.push(`${hoursRemainder} ${i18n.t("Units.Duration.HoursLong", { lng: currentLng })}`);
    if (minutesRemainder > 0)
      parts.push(`${minutesRemainder} ${i18n.t("Units.Duration.MinutesLong", { lng: currentLng })}`);
    if (secondsRemainder > 0)
      parts.push(`${secondsRemainder} ${i18n.t("Units.Duration.SecondsLong", { lng: currentLng })}`);
    return parts.join(", ") || `0 ${i18n.t("Units.Duration.SecondsLong", { lng: currentLng })}`;
  };
}

export function createScoreFormatter(i18n: {
  t: (key: string, options?: { lng?: string }) => string;
  language: string;
}) {
  return (value: unknown, lng?: string, options?: { precision?: number }) => {
    const score = value as { type: "cp" | "mate" | "dtz"; value: number };
    const precision = options?.precision || 2;
    const currentLng = lng || i18n.language;

    let scoreText = "";
    if (score.type === "cp") {
      scoreText = Math.abs(score.value / 100).toFixed(precision);
    } else if (score.type === "mate") {
      scoreText = `${i18n.t("Units.Score.Mate", { lng: currentLng })}${Math.abs(score.value)}`;
    } else if (score.type === "dtz") {
      scoreText = `${i18n.t("Units.Score.DTZ", { lng: currentLng })}${Math.abs(score.value)}`;
    }

    if (score.type !== "dtz") {
      if (score.value > 0) {
        scoreText = `+${scoreText}`;
      }
      if (score.value < 0) {
        scoreText = `-${scoreText}`;
      }
    }

    return scoreText;
  };
}

export function createDateFormatter(
  _i18n: {
    t: (key: string, options?: { lng?: string }) => string;
    language: string;
  },
  storage?: Storage,
) {
  return (value: unknown, lng?: string, options?: { timeZone?: string }): string => {
    if (!(value instanceof Date)) return String(value);

    try {
      const mode = storage?.getItem("dateFormatMode") || "intl";

      if (mode === "intl") {
        const formatOptions: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour12: false,
          ...(options?.timeZone && { timeZone: options.timeZone }),
        };

        return new Intl.DateTimeFormat("en-CA", formatOptions).format(value);
      }

      const formatOptions: Intl.DateTimeFormatOptions = {
        dateStyle: "short",
        ...(options?.timeZone && { timeZone: options.timeZone }),
      };

      return new Intl.DateTimeFormat(lng?.replace("_", "-"), formatOptions).format(value);
    } catch {
      // Fallback to simple date formatting if localStorage or Intl.DateTimeFormat fails
      return value.toLocaleDateString(lng?.replace("_", "-"));
    }
  };
}

export function createDatetimeFormatter(
  _i18n: {
    t: (key: string, options?: { lng?: string }) => string;
    language: string;
  },
  storage?: Storage,
) {
  return (value: unknown, lng?: string, options?: { timeZone?: string }): string => {
    if (!(value instanceof Date)) return String(value);

    try {
      const mode = storage?.getItem("dateFormatMode") || "intl";

      const formatOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        ...(options?.timeZone && { timeZone: options.timeZone }),
      };
      if (mode === "intl") {
        // YYYY-MM-DD HH:mm
        return new Intl.DateTimeFormat("en-CA", formatOptions).format(value);
      }

      return new Intl.DateTimeFormat(lng?.replace("_", "-"), formatOptions).format(value);
    } catch {
      // Fallback to simple date formatting if localStorage or Intl.DateTimeFormat fails
      return value.toLocaleDateString(lng?.replace("_", "-"));
    }
  };
}

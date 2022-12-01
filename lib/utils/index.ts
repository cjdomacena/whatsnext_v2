export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = {
    month: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
    timeZone: "UTC",
  }
) => {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
  }).format(new Date(date));
};

export const getNumSentences = (text: string) => {
  const sentences = text.split(/[\.!?]+/);
  return sentences.length - 1;
};

export const getDuration = (duration: number) => {
  let minutes = duration;
  let hours = 0;
  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }

  return `${hours !== 0 ? hours + "h" : ""} ${minutes}m`;
};

export const getCompactNumberFormat = (num: number) => {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(num);
};

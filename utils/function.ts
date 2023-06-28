export function sendCustomEvent(eventName: string, eventParam?: Record<string, string>) {
  //@ts-ignore
  window.gtag('event', eventName, eventParam);
}

export const languagePreprocess = (text: string) => {
  const textList = text.split(/&|＆/g).map((val) => val.trim());
  if (textList.length === 3) {
    return {
      kr: textList[0],
      zh: textList[1],
      en: textList[2],
    };
  }
  return {
    kr: text,
    zh: text,
    en: text,
  };
};
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

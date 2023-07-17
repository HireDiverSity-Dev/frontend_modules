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

export function generateSubsets<T>(array: T[]): T[][] {
  const subsets: T[][] = [[]]; // 초기 부분집합은 빈 배열 하나
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const subsetCount = subsets.length;
    for (let j = 0; j < subsetCount; j++) {
      const subset = subsets[j];
      subsets.push([...subset, current]);
    }
  }
  return subsets.slice(1);
}

export const getRandomString = (length: number = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (var i = 0; i < length; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return text;
};

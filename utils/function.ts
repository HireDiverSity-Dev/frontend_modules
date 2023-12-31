import { Translation, TranslationInterface } from 'fe-modules/models/lang';

export function sendCustomEvent(eventName: string, eventParam?: Record<string, string>) {
  //@ts-ignore
  window.gtag('event', eventName, eventParam);
}
export const languagePreprocess = (text: string): Translation => {
  const translation: TranslationInterface = {
    en: '',
  };
  const textList = text.split(/&|＆/g).map((val) => val.trim());
  if (textList.length === 1) translation.en = text;
  else {
    translation.kr = textList[0] ?? '';
    translation.zh = textList[1] ?? '';
    translation.en = textList[2] ?? '';
    translation.jp = textList[3] ?? '';
    translation.vn = textList[4] ?? '';
  }
  return new Translation(translation);
};

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

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

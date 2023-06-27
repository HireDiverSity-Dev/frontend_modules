import { isCause, 연장_보완서류 } from '@/models/airtable';
//const TextOrder = ['kr', 'zh', 'en'];

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

export const 연장_언어분리 = (text: string) => {
  let textList = text.split(/\//g).map((val) => val.trim());

  let cause: 연장_보완서류 = '기타';
  let kr = '';
  let zh = '';
  let en = '';
  // 공백 있는 경우 공백 제거
  if (textList.length % 3 === 2 && textList[textList.length - 1] === '') {
    textList = textList.slice(0, textList.length - 1);
  }

  // 예외 처리
  if (textList.length === 1 || textList.length % 3 === 2) {
    return {
      cause: cause,
      reason: {
        kr: text,
        zh: text,
        en: text,
      },
    };
  }

  // 예외 처리 2: 앞에 서류명 적힌 경우
  if (textList.length % 3 === 1 && textList.length > 1 && isCause(textList[0])) {
    cause = textList[0];
    textList = textList.slice(1);
  }

  // 언어 분리
  textList.map((curText, index) => {
    switch (index % 3) {
      case 0:
        kr += `${curText}\n`;
        break;
      case 1:
        en += `${curText}\n`;
        break;
      case 2:
        zh += `${curText}\n`;
    }
  });

  return {
    cause: cause,
    reason: {
      kr: kr.slice(0, kr.length - 1),
      zh: zh.slice(0, zh.length - 1),
      en: en.slice(0, en.length - 1),
    },
  };
};

export const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const currentDate = year + month + day + '_' + hours + ':' + minutes;

  return currentDate;
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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export function base64ToFile(base64Data: string, filename: string, contentType = 'image/png') {
  const byteString = atob(base64Data.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: contentType });
  const file = new File([blob], filename, { type: contentType });

  return file;
}

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function sendCustomEvent(eventName: string, eventParam?: Record<string, string>) {
  //@ts-ignore
  window.gtag('event', eventName, eventParam);
}

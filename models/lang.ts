export const enum Lang {
  KOR = 'kr',
  ENG = 'en',
  CHN = 'zh',
}

export const enum LangServer {
  KOR = '한국어',
  ENG = '영어',
  CHN = '중국어',
}

export const langConvert = (lang: LangServer) => {
  switch (lang) {
    case LangServer.KOR:
      return Lang.KOR;
    case LangServer.ENG:
      return Lang.ENG;
    case LangServer.CHN:
      return Lang.CHN;
    default:
      return Lang.ENG;
  }
};

export const defaultLang = Lang.ENG;

export interface Translation {
  en: string;
  kr?: string;
  zh?: string;
}

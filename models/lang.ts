export const enum Lang {
  KOR = 'kr',
  ENG = 'en',
  CHN = 'zh',
  JPN = 'jp',
  VNM = 'vn',
}

export const LangList = [Lang.KOR, Lang.ENG, Lang.CHN, Lang.JPN, Lang.VNM];

export const enum LangServer {
  KOR = '한국어',
  ENG = '영어',
  CHN = '중국어',
  JPN = '일본어',
  VNM = '베트남어',
}

export const langConvertServer = (lang: Lang) => {
  switch (lang) {
    case Lang.KOR:
      return LangServer.KOR;
    case Lang.ENG:
      return LangServer.ENG;
    case Lang.CHN:
      return LangServer.CHN;
    case Lang.JPN:
      return LangServer.JPN;
    case Lang.VNM:
      return LangServer.VNM;
    default:
      return LangServer.ENG;
  }
};

export const langConvert = (lang: LangServer) => {
  switch (lang) {
    case LangServer.KOR:
      return Lang.KOR;
    case LangServer.ENG:
      return Lang.ENG;
    case LangServer.CHN:
      return Lang.CHN;
    case LangServer.JPN:
      return Lang.JPN;
    case LangServer.VNM:
      return Lang.VNM;
    default:
      return Lang.ENG;
  }
};

export const defaultLang = Lang.ENG;

export interface Translation {
  en: string;
  kr?: string;
  zh?: string;
  jp?: string;
  vn?: string;
}

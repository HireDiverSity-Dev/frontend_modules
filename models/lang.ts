export interface TranslationInterface {
  en: string;
  kr?: string;
  zh?: string;
  jp?: string;
  vn?: string;
}
export type SupportLanguage = keyof TranslationInterface; // SupportLanguage => SupportLanguage

export type SupportLanguageKorean = '한국어' | '영어' | '중국어' | '일본어' | '베트남어'; // SupportLanguageKorean => SupportLanguageKorean
export type SupportLanguageEnglish = 'Korean' | 'English' | 'Chinese' | 'Japanese' | 'Vietnamese';
export type SupportLanguageLocale = '한국어' | 'English' | '中文' | '日本語' | 'Tiếng Việt';

export const LanguageObject: {
  korean: { [key in SupportLanguage]: SupportLanguageKorean };
  english: { [key in SupportLanguage]: SupportLanguageEnglish };
  locales: { [key in SupportLanguage]: SupportLanguageLocale };
} = {
  korean: {
    en: '영어',
    kr: '한국어',
    zh: '중국어',
    jp: '일본어',
    vn: '베트남어',
  },
  english: {
    en: 'English',
    kr: 'Korean',
    zh: 'Chinese',
    jp: 'Japanese',
    vn: 'Vietnamese',
  },
  locales: {
    en: 'English',
    kr: '한국어',
    zh: '中文',
    jp: '日本語',
    vn: 'Tiếng Việt',
  },
};

export const LanguageList: SupportLanguage[] = ['en', 'kr', 'zh', 'jp', 'vn']; // LangList => LanguageList

export const DefaultTranslation: TranslationInterface = LanguageList.reduce((acc, cur: SupportLanguage) => {
  acc[cur] = '';
  return acc;
}, {} as TranslationInterface);

// supportLanguageConvertKorean => supportLanguageConvertKorean
export const supportLanguageConvertToKorean = (lang: SupportLanguage) => {
  return LanguageObject.korean[lang];
};

export const supportLanguageConvertToEnglish = (lang: SupportLanguage) => {
  return LanguageObject.english[lang];
};

export const supportLanguageConvertToLocale = (lang: SupportLanguage) => {
  return LanguageObject.locales[lang];
};

export const koreanConvertToSupportLanguage = (lang: SupportLanguageKorean) => {
  return Object.keys(LanguageObject.korean).find((key) => LanguageObject.korean[key as SupportLanguage] === lang);
};

export class Translation {
  [key: string]: string;
  constructor(translation: TranslationInterface) {
    LanguageList.forEach((lang: SupportLanguage) => {
      this[lang] = translation[lang] ?? translation['en'];
    });
  }
}

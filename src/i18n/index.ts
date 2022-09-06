import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koKR from './locales/ko-KR/translation.json';
import enUS from './locales/en-US/translation.json';
import jaJP from './locales/ja-JP/translation.json';
import zhCN from './locales/zh-CN/translation.json';

const resources = {
  ko: { translation: koKR },
  en: { translation: enUS },
  ja: { translation: jaJP },
  zh: { translation: zhCN }
};

// 브라우저 언어 설정 가져오기
const browserLang = window.navigator.language.split('-')[0];

// localStorage에서 언어 설정 가져오기
const userLanguage = localStorage.getitem('lang') ?? browserLang;

i18n.use(initReactI18next).init({
  resources,
  lng: userLanguage || 'ko',
  fallbackLng: 'ko',
  debug: true,
  defaultNS: 'translation',
  ns: 'translation',
  initImmediate: false,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
    alwaysFormat: true,
    format(value, format, lng) {
      if (format === 'uppercase') return value.toUpperCase();
      // interpolation 되는 값이 number로 들어올 때, 언어 설정에 맞는 locale string으로 변환해서 반환
      if (typeof value === 'number') return value.toLocaleString(lng);
      return value;
    }
  },
  react: {
    useSuspense: false,
    defaultTransParent: 'div',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    // <Trans> 컴포넌트 내부에 들어가는 html 태그들
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'button', 'a', 'span', 'div', 'input'],
    transWrapTextNodes: ''
  },
  nsSeparator: '=>', // default: ':', :가 번역 키에 포함되는 사례가 있어, 번역 키로 사용되지 않을 것 같은 seperator를 설정
  nonExplicitSupportedLngs: true
});

export default i18n;

// i18next를 파라미터로 넘길 때 사용할 인터페이스 타입
export interface I18Next {
  t: (str: string, option?: Object) => string;
}

// scanner를 사용하기 위한 dummy function
export const i18nextScanKey = (key: string): string => key;

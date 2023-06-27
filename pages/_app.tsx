import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import nextI18nConfig from '../next-i18next.config';
import { ModalProvider } from '@/hooks/useModal';

function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
export default appWithTranslation(App, nextI18nConfig);

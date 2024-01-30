import "../styles/css/bootstrap.min.css";
import "../styles/css/plugins.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/css/nprogress.css";
import "../styles/css/style.css";
import "../styles/globals.css";
// import "../styles/css/responsive.css";

import { getCookie } from "cookies-next";
import { AppPropsWithLayout } from "../src/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

import AuthProvider from "../src/contexts/AuthProvider";

import { ToastProvider } from "react-toast-notifications";
import MediaProvider from "../src/contexts/MediaProvider";
import RouteGuard from "../src/Services/RouteGuard";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect } from "react";
import NProgress from "nprogress";
import { Router } from "next/router";
import GeneralLayout from "../layouts/GeneralLayout";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../src/store/index";
import Script from "next/script";

function NftApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  const { account, library } = useWeb3React();
  const getLayout = Component.getLayout ?? ((page) => page);

  const getLibrary = (provider: any) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
      />

      <Script id="google-analytics-script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}', {
          page_path: window.location.pathname,
          });
    `}
      </Script>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider autoDismiss={true}>
              <MediaProvider>
                <AuthProvider>
                  <RouteGuard>
                    {JSON.stringify(account)}
                    <GeneralLayout>
                      <>
                        {getLayout(<Component {...pageProps} />)}
                        <ReactQueryDevtools initialIsOpen={false} />
                      </>
                    </GeneralLayout>
                  </RouteGuard>
                </AuthProvider>
              </MediaProvider>
            </ToastProvider>
          </QueryClientProvider>
        </ReduxProvider>
      </Web3ReactProvider>
    </>
  );
}

export default NftApp;
//lang ok

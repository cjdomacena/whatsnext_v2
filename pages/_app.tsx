import "../styles/globals.css";
import "../styles/radix.css";
import "@fontsource/work-sans";
import "@fontsource/work-sans/200.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/work-sans/800.css";
import "@fontsource/work-sans/900.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import MetaHeader from "@components/MetaHeader";
import { Navbar } from "@components/common/navbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import toast, { Toaster } from "react-hot-toast";
import Footer from "@components/common/footer";
import { Router } from "next/router";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const routeEventStart = (url: string) => {
      console.log(url);
      if (url.includes("/details")) {
        toast.loading("Loading...", {
          position: "top-right",
        });
      }
    };
    const routeEventEnd = (url: string) => {
      if (url.includes("/details")) {
        toast.dismiss();
      }
    };

    Router.events.on("routeChangeStart", routeEventStart);
    Router.events.on("routeChangeComplete", routeEventEnd);
    Router.events.on("routeChangeError", routeEventEnd);
    return () => {
      Router.events.off("routeChangeStart", routeEventStart);
      Router.events.off("routeChangeComplete", routeEventEnd);
      Router.events.off("routeChangeError", routeEventEnd);
    };
  }, []);
  return (
    <main className="min-w-screen transition-colors overflow-x-hidden">
      <MetaHeader
        title="WhatsNext"
        description="Pick up where you left off. Track your shows!"
      />
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {appProps.router.pathname.split("/").includes("auth") ? null : (
              <Navbar />
            )}

            {/* <ReactQueryDevtools initialIsOpen={false} /> */}

            <Component {...pageProps} />
            {appProps.router.pathname.split("/").includes("auth") ? null : (
              <Footer />
            )}
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
      <Toaster
        toastOptions={{
          className: "dark:bg-neutral-900 bg-white dark:text-white text-sm",
        }}
        position="top-center"
      />
    </main>
  );
}

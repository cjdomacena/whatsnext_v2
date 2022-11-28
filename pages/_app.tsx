import "../styles/globals.css";
import "../styles/radix.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import MetaHeader from "@components/MetaHeader";
import { Navbar } from "@components/common/navbar";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "keen-slider/keen-slider.min.css";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <main className="min-w-screen transition-colors ">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MetaHeader title="WhatsNext" description="Something something" />
        <QueryClientProvider client={queryClient}>
          {appProps.router.pathname.split("/").includes("auth") ? null : (
            <Navbar />
          )}

          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </SessionContextProvider>
    </main>
  );
}

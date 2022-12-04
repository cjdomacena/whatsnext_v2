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
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <main className="min-w-screen transition-colors overflow-x-hidden">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MetaHeader
          title="WhatsNext"
          description="Pick up where you left off. Track your shows!"
        />
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
      <Toaster
        toastOptions={{
          className: "dark:bg-neutral-900 bg-white dark:text-white text-sm",
        }}
        position="top-center"
      />
    </main>
  );
}

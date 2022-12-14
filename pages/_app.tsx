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
import { Analytics } from "@vercel/analytics/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "keen-slider/keen-slider.min.css";
import Footer from "@components/common/footer";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Sentry from "@sentry/nextjs";
import { Toaster } from "react-hot-toast";
import { Fallback } from "@components/common/util";
import SubscriptionProvider from "@components/context/SubscriptionContext";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Sentry.ErrorBoundary
      showDialog
      fallback={(props) => <Fallback {...props} />}
    >
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
              <SubscriptionProvider>
                {appProps.router.pathname.split("/").includes("auth") ? null : (
                  <Navbar />
                )}

                <ReactQueryDevtools initialIsOpen={false} />

                <Component {...pageProps} />
                {appProps.router.pathname.split("/").includes("auth") ? null : (
                  <Footer />
                )}
              </SubscriptionProvider>
            </Hydrate>
          </QueryClientProvider>
        </SessionContextProvider>
      </main>
      <Toaster
        toastOptions={{
          className: "dark:bg-neutral-900 bg-white dark:text-white text-sm",
        }}
        position="top-center"
      />
      <Analytics />
    </Sentry.ErrorBoundary>
  );
}

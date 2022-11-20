import "../styles/globals.css";
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

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <main className="min-w-screen min-h-screen dark:bg-[#080808] bg-white transition-colors">
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MetaHeader title="WhatsNext" description="Something something" />
        <div className=" h-full">
          {appProps.router.pathname.split("/").includes("auth") ? null : (
            <Navbar />
          )}
          <Component {...pageProps} />
        </div>
      </SessionContextProvider>
    </main>
  );
}

import "@/assets/scss/globals.scss";

import { VisualEditing } from "next-sanity";
import type { AppProps } from "next/app";
import Head from "next/head";
import { lazy, Suspense } from "react";

const PreviewProvider = lazy(
  () => import("@/components/PreviewProvider/PreviewProvider"),
);

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Menu Maker</title>
      </Head>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
          <Suspense>
            <VisualEditing />
          </Suspense>
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

import Head from "next/head";

import "../styles/globals.scss";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>one.com code challenge</title>
      </Head>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;

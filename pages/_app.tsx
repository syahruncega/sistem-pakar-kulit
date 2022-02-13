import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import { SessionProvider } from "next-auth/react";
import { SistemPakarProvider } from "contexts/SistemPakarContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SistemPakarProvider>
          <Component {...pageProps} />
        </SistemPakarProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;

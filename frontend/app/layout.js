import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import { Inter } from "next/font/google";
import Header from './components/Header';
import Footer from './components/Footer'; 
import { Flex } from '@chakra-ui/react';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Bank Dapp",
  description: "Bank Dapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitAndChakraProvider>
          <Header />
              <Flex grow="1" p="2rem" direction="column" maxWidth="60%" mx="auto">
                  {children}
              </Flex>
            <Footer />
        </RainbowKitAndChakraProvider>
      </body>
    </html>
  );
}

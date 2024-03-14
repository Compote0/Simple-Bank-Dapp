'use client';
import { useAccount } from "wagmi";

import NotConnected from "./components/not-connected";
import Bank from "./components/Bank";

export default function Home() {

  const { address, isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        <>
          <Bank />
        </>
      ) : (
        <>
          <NotConnected />
        </>
      )}
    </>
  );
}
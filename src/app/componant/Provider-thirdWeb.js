"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ActiveChain, clientId } from "./Constants";

export default function ThirdWebProvider({ children }) {
  return (
    <ThirdwebProvider activeChain={ActiveChain} clientId={clientId}>
      {children}
    </ThirdwebProvider>
  );
}

// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider as JotaiProviderLocal, createStore } from "jotai";

export const jotaiGlobalStore = createStore();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProviderLocal store={jotaiGlobalStore}>
      <ChakraProvider>{children}</ChakraProvider>
    </JotaiProviderLocal>
  );
}

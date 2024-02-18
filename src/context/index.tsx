"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function ContextWrapper({ children }: { children: React.ReactNode }) {
  const [idToken, setIdToken] = useState("");

  return (
    <AppContext.Provider
      value={{
        idToken,
        setIdToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

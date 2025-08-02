"use client";

import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={"Loading..."} persistor={persistStore(store)}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
}

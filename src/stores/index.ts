import { registerRootStore } from "mobx-keystone";
import React from "react";
import RootStore from "./RootStore";

import UserStore from "./UserStore";


const StoreContext = React.createContext<RootStore>({} as RootStore);

const useStore = () => React.useContext(StoreContext);
const { Provider: StoreProvider } = StoreContext;

function createRootStore() {
  const rootStore = new RootStore({
    userStore: new UserStore({}),
  });

  registerRootStore(rootStore);
  return rootStore;
}

export { RootStore, StoreContext, StoreProvider, createRootStore, useStore };

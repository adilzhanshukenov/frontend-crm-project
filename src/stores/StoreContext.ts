import React from 'react';
import { userStore } from './userStore/UserStore';

export const StoreContext = React.createContext({
  userStore,
});

export const useStores = () => React.useContext(StoreContext);

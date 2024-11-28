import React from 'react';
import rootStore from './rootStore/RootStore';

export const StoreContext = React.createContext({
  rootStore,
});

export const useStores = () => React.useContext(StoreContext);

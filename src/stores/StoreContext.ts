import React from "react";
import { userStore } from "./userStore/UserStore";
import { companyStore } from "./companyStore/CompanyStore";
import { projectStore } from "./projectStore/ProjectStore";

export const StoreContext = React.createContext({
    userStore,
    companyStore,
    projectStore
});

export const useStores = () => React.useContext(StoreContext);
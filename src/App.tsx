import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { StoreContext } from "./stores/StoreContext";
import { userStore } from "./stores/userStore/UserStore";
import { companyStore } from "./stores/companyStore/CompanyStore";
import { projectStore } from "./stores/projectStore/ProjectStore";

function App() {
  return (
    <StoreContext.Provider value={{ userStore, companyStore, projectStore }}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
  );
}

export default App;

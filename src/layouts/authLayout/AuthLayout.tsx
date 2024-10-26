import { Outlet } from "react-router-dom";
import "./authlayout.css";

// interface AuthLayoutProps {
//     children: React.ReactNode;
// }

const AuthLayout: React.FC = () => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;

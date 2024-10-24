import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/footer/Footer";
import Header from "../../components/shared/header/Header";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import './mainlayout.css'

// interface MainLayoutProps {
//     children: React.ReactNode;
// }

const MainLayout:React.FC = () => {
    return (
        <div className="layout">
            <Header/>
            <div className="content-area">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default MainLayout
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
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
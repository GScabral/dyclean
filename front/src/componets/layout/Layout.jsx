// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import "./layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout">
            {/* <Sidebar /> */}
            <div className="main">
                {/* <Header /> */}
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

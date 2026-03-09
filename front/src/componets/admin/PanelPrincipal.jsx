import Layout from "../layout/Layout";
import HeaderAdmin from "./layout/HeaderAdmin";
import Dashboard from "./Dashboard";

const PanelPrincipal = () => {
    return (
        <>
            <HeaderAdmin />
            <Layout>
                <Dashboard />
            </Layout>
        </>
    );
};

export default PanelPrincipal;
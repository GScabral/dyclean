import { Link } from "react-router-dom";
import "./Productos.css";

const ProductosMain = () => {
    return (
        <div className="productos-main">
            <h2>Gestión de Productos</h2>

            <div className="productos-actions">
                <Link to="/ingresoProducto" className="productos-link">
                    <div className="productos-card">
                        📦
                        <span>Ingresar Producto</span>
                        <small>Alta de nuevos productos</small>
                    </div>
                </Link>

                <Link to="/listProducto" className="productos-link">
                    <div className="productos-card secondary">
                        🏬
                        <span>Stock</span>
                        <small>Ver productos y cantidades</small>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProductosMain;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingresarProducto } from "../../../redux/action/productosAction";
import "./agregarProducto.css";

const IngresarProducto = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        nombre: "",
        unidad: "",
        stock_actual: "",
        stock_minimo: ""
    });

    const loading = useSelector(state => state.productoState.loading);
    const message = useSelector(state => state.productoState.message);
    const error = useSelector(state => state.productoState.error);
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        const response = await dispatch(ingresarProducto({
            ...formData,
            stock_actual: Number(formData.stock_actual),
            stock_minimo: Number(formData.stock_minimo)
        }));

        if (response) {
            setMensaje("✅ Producto creado correctamente");
            setFormData({
                nombre: "",
                unidad: "",
                stock_actual: "",
                stock_minimo: ""
            });
        } else {
            setMensaje("❌ Error al crear el producto");
        }
    };

    return (
        <div className="producto-container">
            <h2>Ingresar nuevo producto</h2>

            <form className="producto-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="unidad"
                    placeholder="Unidad (litros, kg, unidades)"
                    value={formData.unidad}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock_actual"
                    placeholder="Stock actual"
                    value={formData.stock_actual}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="stock_minimo"
                    placeholder="Stock mínimo"
                    value={formData.stock_minimo}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Crear producto"}
                </button>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}
            {error && <p className="error">{error}</p>}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default IngresarProducto;

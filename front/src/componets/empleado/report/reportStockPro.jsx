import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportStock } from "../../../redux/action/reportAction";
import { detalleEdificio } from "../../../redux/action/edificioAction";
import "./reportStockPro.css";

const ReportesFaltateProducto = () => {

    const dispatch = useDispatch();

    const usuario = useSelector((state) => state.auth.usuario);
    const detalles = useSelector((state) => state.edificioState.detalleEdificio) ?? {};

    const edificioUsuario = usuario?.edificios?.length
        ? usuario.edificios[0]
        : null;

    const productos = detalles?.productos ?? [];

    const [mensaje, setMensaje] = useState(null);

    const [form, setForm] = useState({
        producto_id: "",
        edificio_id: edificioUsuario?.id ?? "",
        descripcion: ""
    });


    const handleChange = ({ target: { name, value } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        if (usuario?.edificios?.[0]?.id) {
            dispatch(detalleEdificio(usuario.edificios[0].id));
        }
    }, [dispatch, usuario?.edificios]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.producto_id) {
            setMensaje("⚠ Seleccioná un producto");
            return;
        }

        await dispatch(reportStock({
            id: usuario?.id,
            tipo: "producto",
            producto_id: form.producto_id,
            edificio_id: form.edificio_id,
            descripcion: form.descripcion || "Falta stock del producto"
        }));

        setMensaje("🚨 Alerta de stock enviada al administrador");

        setForm({
            producto_id: "",
            edificio_id: edificioUsuario?.id ?? "",
            descripcion: ""
        });
    };

    return (
        <div className="ticket-container">

            <div className="ticket-header">
                <h2>📦 REPORTE DE FALTA DE PRODUCTO</h2>
                <span>Sistema de Edificios</span>
            </div>

            <form className="ticket-body" onSubmit={handleSubmit}>

                <div className="ticket-row">
                    <span>Empleado:</span>
                    <strong>{usuario?.nombre ?? "-"}</strong>
                </div>

                <div className="ticket-row">
                    <span>Edificio:</span>
                    <strong>{edificioUsuario?.nombre ?? "-"}</strong>
                </div>

                {mensaje && (
                    <div className="mensaje-alerta">
                        {mensaje}
                    </div>
                )}

                <label>📦 Producto</label>

                <select
                    name="producto_id"
                    value={form.producto_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar producto</option>

                    {productos.length ? (
                        productos.map((p) => (
                            <option
                                key={p.Producto.id}
                                value={p.Producto.id}
                            >
                                {p.Producto.nombre}
                            </option>
                        ))
                    ) : (
                        <option value="">No hay productos</option>
                    )}

                </select>

                <label>📝 Observaciones (opcional)</label>

                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Ej: queda stock solo para hoy"
                />

                <button type="submit">
                    🚨 Avisar falta de producto
                </button>

            </form>

            <div className="ticket-footer">
                El administrador recibirá esta alerta de stock
            </div>

        </div>
    );
};

export default ReportesFaltateProducto;
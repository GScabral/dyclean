import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nuevoReporte } from "../../../redux/action/reportAction";
import "./nuevoReporte.css";

const GenerarReporte = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state) => state.auth.usuario);

    // Handle case where usuario is null (not authenticated)
    if (!usuario) {
        return (
            <div className="ticket-container">
                <p className="error-message">No hay usuario autenticado. Por favor inicia sesión.</p>
            </div>
        );
    }
    const [form, setForm] = useState({
        descripcion: "",
        tipo: "otro"
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            persona_id: usuario.id,
            descripcion: form.descripcion,
            tipo: form.tipo,
            edificio_id: usuario.Edificios && usuario.Edificios.length > 0 ? usuario.Edificios[0].id : null
        };

        const result = await dispatch(nuevoReporte(payload));
        if (result && result.status === 201) {
            alert("Reporte enviado correctamente");
            setForm({ descripcion: "", tipo: "otro" });
        } else {
            const msg = result?.data?.error || "Error al enviar reporte";
            alert(`❌ ${msg}`);
        }
    };

    return (
        <div className="ticket-container">
            <div className="ticket-header">
                <h2>🧾 REPORTE DE INCIDENCIA</h2>
                <span>Sistema de Edificios</span>
            </div>

            <form className="ticket-body" onSubmit={handleSubmit}>
                <div className="ticket-row">
                    <span>Empleado:</span>
                    <strong>{usuario.nombre}</strong>
                </div>

                <div className="ticket-row">
                    <span>Fecha:</span>
                    <strong>{new Date().toLocaleDateString()}</strong>
                </div>

                <div className="ticket-divider"></div>

                <label>📝 Descripción del problema</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    required
                    placeholder="Describe el problema con el mayor detalle posible..."
                />
                <label>🗂 Tipo de incidencia</label>
                <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                >
                    <option value="infraestructura">Infraestructura</option>
                    <option value="limpieza">Limpieza</option>
                    <option value="producto">Producto</option>
                    <option value="tarea">Tarea</option>
                    <option value="otro">Otro</option>
                </select>

                <button type="submit">📤 Enviar reporte</button>
            </form>

            <div className="ticket-footer">
                Este reporte será revisado por el administrador
            </div>
        </div>
    );
};

export default GenerarReporte;

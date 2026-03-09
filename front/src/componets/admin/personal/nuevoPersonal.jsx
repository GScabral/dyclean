import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearPersona } from "../../../redux/action/personalAction";
import { listaEdificio } from "../../../redux/action/edificioAction";
import "./nuevoPersonal.css";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const NewPersonal = () => {
    const dispatch = useDispatch();
    const edificios = useSelector(
        (state) => state.edificioState.allEdificios
    );

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        telefono: "",
        email: "",
        password: "",
        rol: "empleado",
        edificio_id: "",
        dias_trabajo: [],
        activo: true,
    });


    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(listaEdificio());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDiaChange = (dia) => {
        setFormData((prev) => ({
            ...prev,
            dias_trabajo: prev.dias_trabajo.includes(dia)
                ? prev.dias_trabajo.filter((d) => d !== dia)
                : [...prev.dias_trabajo, dia],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje("");

        const response = await dispatch(crearPersona(formData));

        if (response) {
            setMensaje("✅ Personal creado correctamente");
            setFormData({
                nombre: "",
                apellido: "",
                cedula: "",
                telefono: "",
                email: "",
                password: "",
                rol: "empleado",
                edificio_id: "",
                dias_trabajo: [],
                activo: true,
            });
        } else {
            setMensaje("❌ Error al crear el personal");
        }

        setLoading(false);
    };


    return (
        <div className="new-personal">
            <h2>Crear nuevo personal</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="nombre"
                    placeholder="Nombre completo"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />


                <input
                    name="cedula"
                    placeholder="Cédula"
                    value={formData.cedula}
                    onChange={handleChange}
                    required
                />

                <input
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="empleado">Empleado</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Administrador</option>
                </select>

                {formData.rol !== "admin" && (
                    <select
                        name="edificio_id"
                        value={formData.edificio_id}
                        onChange={handleChange}
                        required={formData.rol === "empleado"}
                    >
                        <option value="">
                            {formData.rol === "empleado"
                                ? "Seleccionar edificio (obligatorio)"
                                : "Seleccionar edificio (opcional)"}
                        </option>
                        {edificios?.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.nombre}
                            </option>
                        ))}
                    </select>
                )}

                {(formData.rol === "empleado" || (formData.rol === "supervisor" && formData.edificio_id)) && (
                    <div className="dias-container">
                        <p>Días de trabajo</p>
                        {diasSemana.map((dia) => (
                            <label key={dia}>
                                <input
                                    type="checkbox"
                                    checked={formData.dias_trabajo.includes(dia)}
                                    onChange={() => handleDiaChange(dia)}
                                />
                                {dia}
                            </label>
                        ))}
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Creando..." : `Crear ${formData.rol}`}
                </button>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}
        </div>
    );
};

export default NewPersonal;

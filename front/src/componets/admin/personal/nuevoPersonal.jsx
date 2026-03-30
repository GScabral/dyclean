
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crearPersona } from "../../../redux/action/personalAction";
import { listaEdificio } from "../../../redux/action/edificioAction";
import "./nuevoPersonal.css";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const initialForm = {
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
};

const NewPersonal = () => {
    const dispatch = useDispatch();

    const edificios = useSelector(
        (state) => state.edificioState.allEdificios || []
    );

    const [formData, setFormData] = useState(initialForm);
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(listaEdificio());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const next = {
                ...prev,
                [name]: value,
            };

            // Si cambia el rol, limpiamos edificio y días para evitar
            // renders inconsistentes.
            if (name === "rol") {
                if (value === "admin") {
                    next.edificio_id = "";
                    next.dias_trabajo = [];
                }

                if (value === "supervisor") {
                    next.dias_trabajo = [];
                }
            }

            return next;
        });
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

        try {
            const response = await dispatch(crearPersona(formData));

            if (response) {
                setMensaje("✅ Personal creado correctamente");
                setFormData(initialForm);
            } else {
                setMensaje("❌ Error al crear el personal");
            }
        } catch (error) {
            console.error(error);
            setMensaje("❌ Error al crear el personal");
        } finally {
            setLoading(false);
        }
    };

    const mostrarDias =
        formData.rol === "empleado" ||
        (formData.rol === "supervisor" && formData.edificio_id);

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
                        key={`edificio-${formData.rol}`}
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

                        {edificios
                            .filter((e) => e && e.id != null)
                            .map((e, index) => (
                                <option
                                    key={`edificio-option-${e.id}-${index}`}
                                    value={e.id}
                                >
                                    {e.nombre}
                                </option>
                            ))}
                    </select>
                )}

                {mostrarDias && (
                    <div
                        key={`dias-${formData.rol}-${formData.edificio_id}`}
                        className="dias-grid"
                    >
                        {diasSemana.map((dia) => (
                            <label
                                key={`dia-${dia}`}
                                className={`dia-item ${formData.dias_trabajo.includes(dia) ? "activo" : ""
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.dias_trabajo.includes(dia)}
                                    onChange={() => handleDiaChange(dia)}
                                />
                                <span>{dia}</span>
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


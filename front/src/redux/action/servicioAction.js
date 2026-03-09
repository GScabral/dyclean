import api from "../api/axiosConfig"; // tu instancia axios

// 🔹 TYPES
export const CREAR_SERVICIO_REQUEST = "CREAR_SERVICIO_REQUEST";
export const CREAR_SERVICIO_SUCCESS = "CREAR_SERVICIO_SUCCESS";
export const CREAR_SERVICIO_ERROR = "CREAR_SERVICIO_ERROR";

export const GET_SERVICIOS_REQUEST = "GET_SERVICIOS_REQUEST";
export const GET_SERVICIOS_SUCCESS = "GET_SERVICIOS_SUCCESS";
export const GET_SERVICIOS_ERROR = "GET_SERVICIOS_ERROR";

export const GET_SERVICIOS_PERSONA_REQUEST = "GET_SERVICIOS_PERSONA_REQUEST";
export const GET_SERVICIOS_PERSONA_SUCCESS = "GET_SERVICIOS_PERSONA_SUCCESS";
export const GET_SERVICIOS_PERSONA_ERROR = "GET_SERVICIOS_PERSONA_ERROR";

export const GET_TOTAL_MENSUAL_REQUEST = "GET_TOTAL_MENSUAL_REQUEST";
export const GET_TOTAL_MENSUAL_SUCCESS = "GET_TOTAL_MENSUAL_SUCCESS";
export const GET_TOTAL_MENSUAL_ERROR = "GET_TOTAL_MENSUAL_ERROR";


// 🟢 1️⃣ Crear servicio
// 🟢 1️⃣ Crear servicio
export const crearServicio = (datos) => async (dispatch) => {
    try {
        dispatch({ type: CREAR_SERVICIO_REQUEST });

        const { data } = await api.post("/servicios/newService", datos);

        dispatch({
            type: CREAR_SERVICIO_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CREAR_SERVICIO_ERROR,
            payload: error.response?.data?.error || "Error al crear servicio",
        });
    }
};


// 🟢 2️⃣ Obtener todos
export const getServicios = (filtros = {}) => async (dispatch) => {
    try {
        dispatch({ type: GET_SERVICIOS_REQUEST });

        const query = new URLSearchParams(filtros).toString();

        const { data } = await api.get(`/servicios/allServicios?${query}`);

        dispatch({
            type: GET_SERVICIOS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: GET_SERVICIOS_ERROR,
            payload: error.response?.data?.error || "Error al obtener servicios",
        });
    }
};


// 🟢 3️⃣ Servicios por persona
export const getServiciosPorPersona = (persona_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_SERVICIOS_PERSONA_REQUEST });

        const { data } = await api.get(`/servicios/persona/${persona_id}`);

        dispatch({
            type: GET_SERVICIOS_PERSONA_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: GET_SERVICIOS_PERSONA_ERROR,
            payload: error.response?.data?.error || "Error al obtener servicios por persona",
        });
    }
};


// 🟢 4️⃣ Total mensual
export const getTotalMensual = (persona_id, mes, anio) => async (dispatch) => {
    try {
        dispatch({ type: GET_TOTAL_MENSUAL_REQUEST });

        const { data } = await api.get(
            `/servicios/total-mensual?persona_id=${persona_id}&mes=${mes}&anio=${anio}`
        );

        dispatch({
            type: GET_TOTAL_MENSUAL_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: GET_TOTAL_MENSUAL_ERROR,
            payload: error.response?.data?.error || "Error al obtener total mensual",
        });
    }
};

import api from "../api/axiosConfig";

// 🔹 Tipos
export const MARCAR_DIA_REQUEST = "MARCAR_DIA_REQUEST";
export const MARCAR_DIA_SUCCESS = "MARCAR_DIA_SUCCESS";
export const MARCAR_DIA_ERROR = "MARCAR_DIA_ERROR";

export const OBTENER_DIAS_REQUEST = "OBTENER_DIAS_REQUEST";
export const OBTENER_DIAS_SUCCESS = "OBTENER_DIAS_SUCCESS";
export const OBTENER_DIAS_ERROR = "OBTENER_DIAS_ERROR";

export const GET_ALL_DIAS_REQUEST = "GET_ALL_DIAS_REQUEST";
export const GET_ALL_DIAS_SUCCESS = "GET_ALL_DIAS_SUCCESS";
export const GET_ALL_DIAS_ERROR = "GET_ALL_DIAS_ERROR";

// ✅ Marcar día trabajado (POST)
export const marcarDiaTrabajado = (persona_id, fecha) => async (dispatch) => {
    try {
        const { data } = await api.post("/diatrabajo/registrodiatrabajo", {
            persona_id,
            fecha,
        });


        return data; // 🔥 IMPORTANTE
    } catch (error) {
        return { error: "Error al marcar día" };
    }
};


// ✅ Obtener días trabajados (GET)
export const obtenerDiasTrabajados = (personaId, anio, mes) => async (dispatch) => {
    try {
        dispatch({ type: OBTENER_DIAS_REQUEST });

        const { data } = await api.get(
            `/diatrabajo/dias-trabajados/${personaId}/${anio}/${mes}`
        );
        dispatch({
            type: OBTENER_DIAS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: OBTENER_DIAS_ERROR,
            payload: error.response?.data?.error || "Error al obtener días",
        });
    }
};


export const getAllDiasTrabajo = (filtros = {}) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_DIAS_REQUEST });

        const query = new URLSearchParams(filtros).toString();

        const url = query
            ? `/diatrabajo/allDias?${query}`
            : `/diatrabajo/allDias`;

        const { data } = await api.get(url);

        dispatch({
            type: GET_ALL_DIAS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_DIAS_ERROR,
            payload: error.response?.data?.error || "Error al obtener registros"
        });
    }
};

import api from "../api/axiosConfig";

export const GENERAR_LIQ_REQUEST = "GENERAR_LIQ_REQUEST";
export const GENERAR_LIQ_SUCCESS = "GENERAR_LIQ_SUCCESS";
export const GENERAR_LIQ_ERROR = "GENERAR_LIQ_ERROR";

export const GET_LIQ_REQUEST = "GET_LIQ_REQUEST";
export const GET_LIQ_SUCCESS = "GET_LIQ_SUCCESS";
export const GET_LIQ_ERROR = "GET_LIQ_ERROR";

export const PAGAR_LIQ_REQUEST = "PAGAR_LIQ_REQUEST";
export const PAGAR_LIQ_SUCCESS = "PAGAR_LIQ_SUCCESS";
export const PAGAR_LIQ_ERROR = "PAGAR_LIQ_ERROR";


// 🔹 Generar
export const generarLiquidacion = (datos) => async (dispatch) => {
    try {
        dispatch({ type: GENERAR_LIQ_REQUEST });

        const response = await api.post("/liquidacion/generar", datos);


        dispatch({
            type: GENERAR_LIQ_SUCCESS,
            payload: response.data,
        });

        return response.data; // 👈 IMPORTANTE

    } catch (error) {
        console.error("ERROR GENERAR:", error.response?.data);

        dispatch({
            type: GENERAR_LIQ_ERROR,
            payload: error.response?.data?.error || "Error",
        });

        return null;
    }
};

// 🔹 Obtener todas
export const getLiquidaciones = () => async (dispatch) => {
    try {
        dispatch({ type: GET_LIQ_REQUEST });

        const { data } = await api.get("/liquidacion/totalliquidacion");

        dispatch({
            type: GET_LIQ_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: GET_LIQ_ERROR,
            payload: error.response?.data?.error || "Error",
        });
    }
};


// 🔹 Marcar pagado


export const pagarLiquidacion = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAGAR_LIQ_REQUEST });

        await api.put(`/liquidacion/pagar/${id}`);

        dispatch({
            type: PAGAR_LIQ_SUCCESS,
            payload: id,
        });

    } catch (error) {
        dispatch({
            type: PAGAR_LIQ_ERROR,
            payload: error.response?.data?.error || "Error",
        });
    }
};
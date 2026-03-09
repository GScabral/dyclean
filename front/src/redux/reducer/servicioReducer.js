import {
    CREAR_SERVICIO_REQUEST,
    CREAR_SERVICIO_SUCCESS,
    CREAR_SERVICIO_ERROR,
    GET_SERVICIOS_REQUEST,
    GET_SERVICIOS_SUCCESS,
    GET_SERVICIOS_ERROR,
    GET_SERVICIOS_PERSONA_REQUEST,
    GET_SERVICIOS_PERSONA_SUCCESS,
    GET_SERVICIOS_PERSONA_ERROR,
    GET_TOTAL_MENSUAL_REQUEST,
    GET_TOTAL_MENSUAL_SUCCESS,
    GET_TOTAL_MENSUAL_ERROR,
} from "../action/servicioAction";

const initialState = {
    servicios: [],
    serviciosPersona: [],
    totalMensual: 0,
    loading: false,
    error: null,
    mensaje: null,
};

const registroServicioReducer = (state = initialState, action) => {
    switch (action.type) {

        // 🔹 CREAR
        case CREAR_SERVICIO_REQUEST:
            return { ...state, loading: true, error: null };

        case CREAR_SERVICIO_SUCCESS:
            return {
                ...state,
                loading: false,
                servicios: [...state.servicios, action.payload],
                mensaje: "Servicio creado correctamente",
            };

        case CREAR_SERVICIO_ERROR:
            return { ...state, loading: false, error: action.payload };


        // 🔹 GET TODOS
        case GET_SERVICIOS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_SERVICIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                servicios: action.payload,
            };

        case GET_SERVICIOS_ERROR:
            return { ...state, loading: false, error: action.payload };


        // 🔹 GET POR PERSONA
        case GET_SERVICIOS_PERSONA_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_SERVICIOS_PERSONA_SUCCESS:
            return {
                ...state,
                loading: false,
                serviciosPersona: action.payload,
            };

        case GET_SERVICIOS_PERSONA_ERROR:
            return { ...state, loading: false, error: action.payload };


        // 🔹 TOTAL MENSUAL
        case GET_TOTAL_MENSUAL_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_TOTAL_MENSUAL_SUCCESS:
            return {
                ...state,
                loading: false,
                totalMensual: action.payload[0]?.total_mensual || 0,
            };

        case GET_TOTAL_MENSUAL_ERROR:
            return { ...state, loading: false, error: action.payload };


        default:
            return state;
    }
};

export default registroServicioReducer;

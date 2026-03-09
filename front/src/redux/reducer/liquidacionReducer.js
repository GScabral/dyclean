import {
    GENERAR_LIQ_REQUEST,
    GENERAR_LIQ_SUCCESS,
    GENERAR_LIQ_ERROR,
    GET_LIQ_REQUEST,
    GET_LIQ_SUCCESS,
    GET_LIQ_ERROR,
    PAGAR_LIQ_REQUEST,
    PAGAR_LIQ_SUCCESS,
    PAGAR_LIQ_ERROR,
} from "../action/liquidacionAction";

const initialState = {
    liquidaciones: [],
    loading: false,
    error: null,
};

const liquidacionReducer = (state = initialState, action) => {
    switch (action.type) {

        case GENERAR_LIQ_REQUEST:
        case GET_LIQ_REQUEST:
        case PAGAR_LIQ_REQUEST:
            return { ...state, loading: true };

        case GENERAR_LIQ_SUCCESS:
            return {
                ...state,
                loading: false,
                liquidaciones: [...state.liquidaciones, action.payload],
            };

        case GET_LIQ_SUCCESS:
            return {
                ...state,
                loading: false,
                liquidaciones: action.payload,
            };

        case PAGAR_LIQ_SUCCESS:
            return {
                ...state,
                loading: false,
                liquidaciones: state.liquidaciones.map((liq) =>
                    liq.id === action.payload
                        ? { ...liq, estado: "pagado" }
                        : liq
                ),
            };

        case GENERAR_LIQ_ERROR:
        case GET_LIQ_ERROR:
        case PAGAR_LIQ_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default liquidacionReducer;

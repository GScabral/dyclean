import {
  MARCAR_DIA_REQUEST,
  MARCAR_DIA_SUCCESS,
  MARCAR_DIA_ERROR,
  OBTENER_DIAS_REQUEST,
  OBTENER_DIAS_SUCCESS,
  OBTENER_DIAS_ERROR,
  GET_ALL_DIAS_REQUEST,
  GET_ALL_DIAS_SUCCESS,
  GET_ALL_DIAS_ERROR,
} from "../action/registroDiaTrabajoActions";

const initialState = {
  loading: false,
  registros: [],          // 🔥 única fuente de verdad
  totalRegistros: 0,
  mensaje: null,
  error: null,
};

const registroDiaTrabajoReducer = (state = initialState, action) => {
  switch (action.type) {

    // =============================
    // 🔹 MARCAR DIA
    // =============================

    case MARCAR_DIA_REQUEST:
      return {
        ...state,
        loading: true,
        mensaje: null,
        error: null,
      };

    case MARCAR_DIA_SUCCESS:
      return {
        ...state,
        loading: false,
        mensaje: action.payload.mensaje,
        registros: [
          ...state.registros,
          action.payload.data
        ],
        totalRegistros: state.totalRegistros + 1,
      };

    case MARCAR_DIA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =============================
    // 🔹 OBTENER DIAS (por mes)
    // =============================

    case OBTENER_DIAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case OBTENER_DIAS_SUCCESS:
      return {
        ...state,
        loading: false,
        registros: action.payload.dias_trabajados,  // 🔥 ahora sí coincide
        totalRegistros: action.payload.total_dias_trabajados,
      };

    case OBTENER_DIAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =============================
    // 🔹 GET ALL
    // =============================

    case GET_ALL_DIAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_ALL_DIAS_SUCCESS:
      return {
        ...state,
        loading: false,
        registros: action.payload.registros,
        totalRegistros: action.payload.total_registros,
      };

    case GET_ALL_DIAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default registroDiaTrabajoReducer;

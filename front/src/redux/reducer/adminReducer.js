
const initialState = {
    resumenGeneral: null,
    horasTrabajadas: [],
    ausencias: [],
    incidencias: [],
    estadisticas: null,
    loading: false,
    error: null
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_RESUMEN_GENERAL":
            return {
                ...state,
                resumenGeneral: action.payload
            }

        case "GET_HORAS_TRABAJADAS":
            return {
                ...state,
                horasTrabajadas: action.payload
            }

        case "GET_AUSENCIAS":
            return {
                ...state,
                ausencias: action.payload
            }

        case "GET_INCIDENCIAS":
            return {
                ...state,
                incidencias: action.payload
            }

        case "GET_ESTADISTICAS":
            return {
                ...state,
                estadisticas: action.payload
            }

        case "EXPORT_EXCEL_SUCCESS":
            return {
                ...state,
                message: action.payload.message
            }

        case "LOADING_ADMIN":
            return {
                ...state,
                loading: true
            }

        case "ERROR_ADMIN":
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

export default adminReducer

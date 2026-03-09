
const initialState = {
    registrosDiarios: [],
    registrosPorPersona: [],
    jornadadaActiva: null,
    horasTrabajadas: 0,
    loading: false,
    error: null
}

const registroTrabajoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_JORNADA":
            return {
                ...state,
                jornadadaActiva: action.payload,
                registrosDiarios: [action.payload, ...state.registrosDiarios]
            }

        case "FINALIZAR_JORNADA":
            return {
                ...state,
                jornadadaActiva: null,
                registrosDiarios: state.registrosDiarios.map((registro) =>
                    registro.id === action.payload.id ? action.payload : registro
                )
            }

        case "GET_REGISTRO_DIARIO":
            return {
                ...state,
                registrosDiarios: action.payload
            }

        case "GET_REGISTROS_PERSONA":
            return {
                ...state,
                registrosPorPersona: action.payload
            }

        case "GET_HORAS_TRABAJADAS":
            return {
                ...state,
                horasTrabajadas: action.payload
            }

        case "LOADING_REGISTRO":
            return {
                ...state,
                loading: true
            }

        case "ERROR_REGISTRO":
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

export default registroTrabajoReducer

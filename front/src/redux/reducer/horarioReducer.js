
const initialState = {
    allHorarios: [],
    horariosPorPersona: [],
    loading: false,
    error: null
}

const horarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_HORARIO":
            return {
                ...state,
                allHorarios: [action.payload, ...state.allHorarios]
            }

        case "EDIT_HORARIO":
            return {
                ...state,
                allHorarios: state.allHorarios.map((horario) =>
                    horario.id === action.payload.id ? action.payload : horario
                )
            }

        case "GET_HORARIOS_PERSONA":
            return {
                ...state,
                horariosPorPersona: action.payload
            }

        case "LOADING_HORARIOS":
            return {
                ...state,
                loading: true
            }

        case "ERROR_HORARIOS":
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

export default horarioReducer

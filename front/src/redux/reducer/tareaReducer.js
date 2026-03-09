const initialState = {
    allTareas: [],
    allTareasBackUp: [],
    tareaSeleccionada: null,
    loading: false,
    error: null
};

const tareaReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOADING_TAREAS":
            return {
                ...state,
                loading: true,
                error: null
            };

        case "NEW_TAREA":
            return {
                ...state,
                loading: false,
                allTareas: [action.payload, ...state.allTareas],
                allTareasBackUp: [action.payload, ...state.allTareasBackUp]
            };

        case "LIST_TAREAS_ACTIVAS":
            return {
                ...state,
                loading: false,
                allTareas: action.payload,
                allTareasBackUp: action.payload
            };

        case "LIST_TAREAS_PENDIENTES":
            return {
                ...state,
                loading: false,
                allTareas: action.payload,
                allTareasBackUp: action.payload
            };

        case "EDIT_TAREA":
        case "MARK_TAREA_PRIORITARIA":
        case "MARK_TAREA_REALIZADA":
            return {
                ...state,
                loading: false,
                allTareas: state.allTareas.map(t =>
                    t.id === action.payload.id ? action.payload : t
                ),
                allTareasBackUp: state.allTareasBackUp.map(t =>
                    t.id === action.payload.id ? action.payload : t
                )
            };

        case "ERROR_TAREAS":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};

export default tareaReducer;


const initialState = {
    allPersonal: [],
    allPersonalBackUp: [],
    detallePersona: null,
    loadingDetalle: false,
    errorDetalle: null,
}


const personalReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_PERSONA":
            return {
                ...state,
                allEdificios: [action.payload, ...state.allPersonal]
            }

        case "GET_ALLPERSONAL":
            return {
                ...state,
                allPersonal: action.payload,
                allPersonalBackUp: action.payload
            }

        case "GET_DETALLE_PERSONA":
            return {
                ...state,
                detallePersona: action.payload,
                loadingDetalle: false,
                errorDetalle: null,
            }
        case "LOADING_DETALLE_PERSONA":
            return {
                ...state,
                loadingDetalle: true,
                errorDetalle: null
            }
        default:
            return state;
    }
}


export default personalReducer
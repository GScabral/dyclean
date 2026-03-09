const initialState = {
    allEdificios: [],
    productoEdificio: [],
    allEdificiosBackUp: [],
    detalleEdificio: null,
    loadingDetalle: false,
    errorDetalle: null,
};




const edificioReducer = (state = initialState, action) => {
    switch (action.type) {

        /* ===== CREAR EDIFICIO ===== */
        case "NEW_EDIFICIO":
            return {
                ...state,
                allEdificios: [action.payload, ...state.allEdificios],
            };

        /* ===== LISTAR EDIFICIOS ===== */
        case "LIST_EDIFICIO":
            return {
                ...state,
                allEdificios: action.payload,
                allEdificiosBackUp: action.payload,
            };

        case "PRODUTO_EDIFICIO_SUCCESS":
            return {
                ...state,
                productoEdificio: action.payload
            }
        /* ===== DETALLE EDIFICIO ===== */
        case "GET_DETALLE_EDIFICIO":
            return {
                ...state,
                detalleEdificio: action.payload,
                loadingDetalle: false,
                errorDetalle: null,
            };

        /* ===== LOADING DETALLE ===== */
        case "LOADING_DETALLE_EDIFICIO":
            return {
                ...state,
                loadingDetalle: true,
                errorDetalle: null,
            };

        /* ===== ERROR DETALLE ===== */
        case "ERROR_DETALLE_EDIFICIO":
            return {
                ...state,
                loadingDetalle: false,
                errorDetalle: action.payload,
            };
        case "ERROR_PRODUCTO_BY_EDIFICIO":
            return {
                ...state,
                loadingDetalle: false,
                errorDetalle: action.payload,
            };

        default:
            return state;
    }
};

export default edificioReducer;



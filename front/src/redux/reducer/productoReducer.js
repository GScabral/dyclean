const initialState = {
    allProductos: [],
    allProductosBackUp: [],
    productosAsignados: [],
    historialProducto: [],
    historialProductoBackUp: [],
    loading: false,
    error: null,
    message: null
};

const productoReducer = (state = initialState, action) => {
    switch (action.type) {

        case "PRODUCTO_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            };

        case "NEW_PRODUCTO":
            return {
                ...state,
                loading: false,
                allProductos: [action.payload, ...state.allProductos],
                allProductosBackUp: [action.payload, ...state.allProductosBackUp]
            };

        case "LISTA_PRODUCTO":
            return {
                ...state,
                loading: false,
                allProductos: action.payload,
                allProductosBackUp: action.payload
            };

        case "SET_HISTORIAL_STOCK":
            return {
                ...state,
                loading: false,
                historialProducto: action.payload,
                historialProductoBackUp: action.payload
            }

        case "POST_ASIGNAR_PRODUCTO":
            return {
                ...state,
                loading: false,
                productosAsignados: [
                    ...state.productosAsignados,
                    action.payload
                ]
            };
        case "AGREGAR_STOCK_PRODUCTO":

            return {
                ...state,
                loading: false,
                allProductos: state.allProductos.map((p) =>
                    p.id === action.payload.id
                        ? { ...p, stock_actual: action.payload.stock_actual }
                        : p
                )
            };

        case "DELETE_ASIGNACION_PRODUCTO":
            return {
                ...state,
                loading: false,
                productosAsignados: state.productosAsignados.filter(
                    (p) => p.id !== action.payload.id
                )
            };

        case "PRODUCTO_SUCCESS":
            return {
                ...state,
                loading: false,
                message: action.message || null
            };

        case "PRODUCTO_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default productoReducer;
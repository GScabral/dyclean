const intialState = {
    allReport: [],
    allReportBackUp: [],
    stockReport: [],
    stockReportBackUp: []
}



const reportReducer = (state = intialState, action) => {
    switch (action.type) {
        case "NEW_REPORT":
            {
                const newItem = action.payload?.reporte ?? action.payload ?? null;
                return {
                    ...state,
                    allReport: newItem ? [newItem, ...state.allReport] : state.allReport
                }
            }

        case "GET_ALLREPORT":
            {
                const payload = Array.isArray(action.payload) ? action.payload : action.payload?.data ?? [];
                const stock = Array.isArray(payload) ? payload.filter(r => (r.tipo ?? r.tipo_reporte) === "producto") : [];
                return {
                    ...state,
                    allReport: payload,
                    allReportBackUp: payload,
                    stockReport: stock,
                    stockReportBackUp: stock
                }
            }
        case "POST_REPORT_STOCK":
            {
                const item = action.payload?.reporte ?? action.payload ?? null;
                return {
                    ...state,
                    stockReport: item ? [item, ...state.stockReport] : state.stockReport
                }
            }
        case "UPDATE_ESTADO_REPORTE":
            return {
                ...state,
                allReport: state.allReport.map(r =>
                    r.id === action.payload.id ? action.payload : r
                ),
                stockReport: state.stockReport.map(r =>
                    r.id === action.payload.id ? action.payload : r
                )
            };


        default:
            return state;
    }
}





export default reportReducer;
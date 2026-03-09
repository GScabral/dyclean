const initialState = {
    // Empleados del supervisor
    empleadosSupervisor: [],
    loadingEmpleados: false,
    errorEmpleados: null,
    
    // Asistencias
    asistencias: [],
    loadingAsistencias: false,
    errorAsistencias: null,
    
    // Reportes
    reportesSupervisor: [],
    loadingReportes: false,
    errorReportes: null,
    
    // Edificio del supervisor
    edificioSupervisor: null,
    loadingEdificio: false,
    errorEdificio: null
};

const supervisorReducer = (state = initialState, action) => {
    switch (action.type) {
        // === EMPLEADOS ===
        case "LOADING_EMPLEADOS_SUPERVISOR":
            return {
                ...state,
                loadingEmpleados: true,
                errorEmpleados: null
            };
        
        case "GET_EMPLEADOS_SUPERVISOR":
            return {
                ...state,
                empleadosSupervisor: action.payload,
                loadingEmpleados: false
            };
        
        case "ERROR_EMPLEADOS_SUPERVISOR":
            return {
                ...state,
                loadingEmpleados: false,
                errorEmpleados: action.payload
            };
        
        // === ASISTENCIAS ===
        case "LOADING_ASISTENCIAS":
            return {
                ...state,
                loadingAsistencias: true,
                errorAsistencias: null
            };
        
        case "GET_ASISTENCIAS":
            return {
                ...state,
                asistencias: action.payload,
                loadingAsistencias: false
            };
        
        case "ERROR_ASISTENCIAS":
            return {
                ...state,
                loadingAsistencias: false,
                errorAsistencias: action.payload
            };
        
        // === REPORTES ===
        case "LOADING_REPORTES_SUPERVISOR":
            return {
                ...state,
                loadingReportes: true,
                errorReportes: null
            };
        
        case "GET_REPORTES_SUPERVISOR":
            return {
                ...state,
                reportesSupervisor: action.payload,
                loadingReportes: false
            };
        
        case "ERROR_REPORTES_SUPERVISOR":
            return {
                ...state,
                loadingReportes: false,
                errorReportes: action.payload
            };
        
        // === EDIFICIO ===
        case "LOADING_EDIFICIO_SUPERVISOR":
            return {
                ...state,
                loadingEdificio: true,
                errorEdificio: null
            };
        
        case "GET_EDIFICIO_SUPERVISOR":
            return {
                ...state,
                edificioSupervisor: action.payload,
                loadingEdificio: false
            };
        
        case "ERROR_EDIFICIO_SUPERVISOR":
            return {
                ...state,
                loadingEdificio: false,
                errorEdificio: action.payload
            };
        
        default:
            return state;
    }
};

export default supervisorReducer;

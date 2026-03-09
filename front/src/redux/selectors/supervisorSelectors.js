import { createSelector } from 'reselect';

// Selectores base - usar supervisorState en lugar de supervisor
const selectSupervisorState = (state) => state.supervisorState;

// Selectores memoizados para empleados
export const selectEmpleados = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.empleadosSupervisor || []
);

export const selectLoadingEmpleados = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.loadingEmpleados || false
);

export const selectErrorEmpleados = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.errorEmpleados || ""
);

// Selectores para asistencias
export const selectAsistencias = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.asistencias || []
);

export const selectLoadingAsistencias = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.loadingAsistencias || false
);

export const selectErrorAsistencias = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.errorAsistencias || ""
);

// Selectores para reportes
export const selectReportes = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.reportesSupervisor || []
);

export const selectLoadingReportes = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.loadingReportes || false
);

export const selectErrorReportes = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.errorReportes || ""
);

// Selectores para edificio
export const selectEdificioSupervisor = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.edificioSupervisor || null
);

export const selectLoadingEdificio = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.loadingEdificio || false
);

export const selectErrorEdificio = createSelector(
    [selectSupervisorState],
    (supervisor) => supervisor?.errorEdificio || ""
);


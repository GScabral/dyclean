import { createSelector } from 'reselect';

// Selectores base
const selectEdificioState = (state) => state.edificio;

// Selectores memoizados
export const selectDetalleEdificio = createSelector(
    [selectEdificioState],
    (edificio) => edificio?.detalleEdificio || null
);

export const selectLoadingDetalle = createSelector(
    [selectEdificioState],
    (edificio) => edificio?.loadingDetalle || false
);

export const selectErrorDetalle = createSelector(
    [selectEdificioState],
    (edificio) => edificio?.errorDetalle || ""
);

export const selectAllEdificios = createSelector(
    [selectEdificioState],
    (edificio) => edificio?.allEdificios || []
);

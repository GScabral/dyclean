import { combineReducers } from 'redux';
import edificioReducer from "./edificioReducer"
import personalReducer from './personalReducer';
import productoReducer from './productoReducer';
import tareaReducer from './tareaReducer';
import horarioReducer from './horarioReducer';
import registroTrabajoReducer from './registroTrabajoReducer';
import adminReducer from './adminReducer';
import reportReducer from './reportReducer';
import registroDiaTrabajoReducer from './registroDiaTrabajoReducer'
import registroServicioReducer from './servicioReducer'
import liquidacionReducer from './liquidacionReducer'
import authReducer from './authReducer'
import supervisorReducer from './supervisorReducer'
// Reducer temporal para prueba


const rootReducer = combineReducers({
  auth: authReducer,
  edificioState: edificioReducer,
  personalState: personalReducer,
  productoState: productoReducer,
  tareaState: tareaReducer,
  horarioState: horarioReducer,
  registroTrabajoState: registroTrabajoReducer,
  adminState: adminReducer,
  reportState: reportReducer,
  diaTrabajoState: registroDiaTrabajoReducer,
  servicioState: registroServicioReducer,
  liquidacionState: liquidacionReducer,
  supervisorState: supervisorReducer,
})

export default rootReducer;



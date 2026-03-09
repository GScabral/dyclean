import { Route, Routes, useNavigate, } from 'react-router-dom'

// Login
import Login from './componets/Login'
import ProtectedRoute from './componets/ProtectedRoute'

// Admin Components
import PanelPrincipal from './componets/admin/PanelPrincipal'
import Edificio from './componets/admin/edificio/Edificios'
import NewEdificio from './componets/admin/edificio/newEdifico'
import ListEdificios from './componets/admin/edificio/listEdificios'
import DetalleEdificio from './componets/admin/edificio/detallesEdificio'
import Personal from './componets/admin/personal/Personas'
import AgregarPersonal from './componets/admin/personal/nuevoPersonal'
import ListPersonal from './componets/admin/personal/listaPersonal'
import ProductosMain from './componets/admin/productos/Productos'
import Stock from './componets/admin/productos/stokcProducto'
import IngresarProducto from './componets/admin/productos/agregarProducto'
import Tareas from './componets/admin/tareas/Tareas'
import NuevaTarea from './componets/admin/tareas/NuevaTarea'
import ListarTareas from './componets/admin/tareas/ListarTareas'
import ListaDiasTrabajo from './componets/admin/horarios/AsignarHorario'
import RegistroTrabajo from './componets/admin/registroTrabajo/RegistroTrabajo'
import Reportes from './componets/admin/Reportes'
import AsignarTarea from './componets/admin/tareas/asignarTareas'
import DetallePersona from './componets/admin/personal/detalleByIdPersonal'

// Employee Components
import PanelEmpleado from './componets/empleado/PanelEmpleado'
import MiJornada from './componets/empleado/MiJornada'
import MisTareas from './componets/empleado/MisTareas'
import MiHorario from './componets/empleado/MiHorario'
import MiPerfil from './componets/empleado/MiPerfil'
import MisReportes from './componets/empleado/MisReportes'
import GenerarReporte from './componets/empleado/report/nuevoReporte'
import ReportesFaltateProducto from './componets/empleado/report/reportStockPro'

// Supervisor Components
import PanelSupervisor from './componets/supervisor/PanelSupervisor'
import MisEmpleados from './componets/supervisor/MisEmpleados'
import MiEdificio from './componets/supervisor/MiEdificio'
import ReportesEquipo from './componets/supervisor/ReportesEquipo'
import Asistencias from './componets/supervisor/Asistencias'

function App() {
  const navigate = useNavigate();



  return (
    <>
      <Routes>
        {/* LOGIN */}
        <Route path='/login' element={<Login />} />

        {/* ========== ADMIN ROUTES ========== */}
        <Route path='/' element={<ProtectedRoute element={<PanelPrincipal />} requiredRole="admin" />} />

        {/* Edificios */}
        <Route path='/Edificios' element={<ProtectedRoute element={<Edificio />} requiredRole="admin" />} />
        <Route path='/newEdificio' element={<ProtectedRoute element={<NewEdificio />} requiredRole="admin" />} />
        <Route path='/listaedificio' element={<ProtectedRoute element={<ListEdificios />} requiredRole="admin" />} />
        <Route path='/detalleEdicio/:id' element={<ProtectedRoute element={<DetalleEdificio />} requiredRole="admin" />} />

        {/* Personal/Empleados */}
        <Route path='/personal' element={<ProtectedRoute element={<Personal />} requiredRole="admin" />} />
        <Route path='/Empleados' element={<ProtectedRoute element={<Personal />} requiredRole="admin" />} />
        <Route path='/newPersonal' element={<ProtectedRoute element={<AgregarPersonal />} requiredRole="admin" />} />
        <Route path='/listPersonal' element={<ProtectedRoute element={<ListPersonal />} requiredRole="admin" />} />
        <Route path='/detallePersona/:id' element={<ProtectedRoute element={<DetallePersona />} requiredRole="admin" />} />


        {/* Productos */}
        <Route path='/producto' element={<ProtectedRoute element={<ProductosMain />} requiredRole="admin" />} />
        <Route path='/productos' element={<ProtectedRoute element={<ProductosMain />} requiredRole="admin" />} />
        <Route path='/listProducto' element={<ProtectedRoute element={<Stock />} requiredRole="admin" />} />
        <Route path='/ingresoProducto' element={<ProtectedRoute element={<IngresarProducto />} requiredRole="admin" />} />

        {/* Tareas */}
        <Route path='/tareas' element={<ProtectedRoute element={<Tareas />} requiredRole="admin" />} />
        <Route path='/nuevaTarea' element={<ProtectedRoute element={<NuevaTarea />} requiredRole="admin" />} />
        <Route path='/listarTareas' element={<ProtectedRoute element={<ListarTareas />} requiredRole="admin" />} />
        <Route path='/tareasEdificio' element={<ProtectedRoute element={<AsignarTarea />} requiredRole="admin" />} />

        {/* Horarios */}
        <Route path='/horarios' element={<ProtectedRoute element={<ListaDiasTrabajo />} requiredRole="admin" />} />

        {/* Registro de Trabajo */}
        <Route path='/registro-trabajo' element={<ProtectedRoute element={<RegistroTrabajo />} requiredRole="admin" />} />

        {/* Reportes */}
        <Route path='/reportes' element={<ProtectedRoute element={<Reportes />} requiredRole="admin" />} />
        <Route path='/incidencias' element={<ProtectedRoute element={<Reportes />} requiredRole="admin" />} />

        {/* ========== SUPERVISOR ROUTES ========== */}
        <Route path='/supervisor' element={<ProtectedRoute element={<PanelSupervisor />} requiredRole="supervisor" />} />
        <Route path='/supervisor/empleados' element={<ProtectedRoute element={<MisEmpleados />} requiredRole="supervisor" />} />
        <Route path='/supervisor/edificio' element={<ProtectedRoute element={<MiEdificio />} requiredRole="supervisor" />} />
        <Route path='/supervisor/reportes' element={<ProtectedRoute element={<ReportesEquipo />} requiredRole="supervisor" />} />
        <Route path='/supervisor/asistencias' element={<ProtectedRoute element={<Asistencias />} requiredRole="supervisor" />} />

        {/* ========== EMPLOYEE ROUTES ========== */}
        <Route path='/empleado' element={<ProtectedRoute element={<PanelEmpleado />} requiredRole="empleado" />} />
        <Route path='/empleado/jornada' element={<ProtectedRoute element={<MiJornada />} requiredRole="empleado" />} />
        <Route path='/empleado/tareas' element={<ProtectedRoute element={<MisTareas />} requiredRole="empleado" />} />
        <Route path='/empleado/horario' element={<ProtectedRoute element={<MiHorario />} requiredRole="empleado" />} />
        <Route path='/empleado/perfil' element={<ProtectedRoute element={<MiPerfil />} requiredRole="empleado" />} />
        <Route path='/empleado/reportes' element={<ProtectedRoute element={<MisReportes />} requiredRole="empleado" />} />
        <Route path='/empleado/reporte' element={<ProtectedRoute element={<GenerarReporte />} requiredRole="empleado" />} />
        <Route path='/empleado/reporteStock' element={<ProtectedRoute element={<ReportesFaltateProducto />} requiredRole="empleado" />} />
      </Routes>
    </>
  )
}

export default App

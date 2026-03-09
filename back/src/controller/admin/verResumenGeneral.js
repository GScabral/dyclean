const { conn } = require('../../config/db');

/**
 * ============================
 * 1. RESUMEN GENERAL
 * ============================
 */
exports.getResumenGeneral = async (req, res) => {
    try {
        const [rows] = await conn.query(`
      SELECT
        (SELECT COUNT(*) FROM edificios WHERE activo = true) AS total_edificios,
        (SELECT COUNT(*) FROM personas WHERE activo = true) AS total_personal,
        (SELECT COUNT(*) FROM registro_trabajo WHERE fecha = CURRENT_DATE) AS jornadas_hoy,
        (SELECT COUNT(*) FROM fotos WHERE tipo = 'incidencia') AS total_incidencias
    `);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener resumen general' });
    }
};

/**
 * ============================
 * 2. HORAS TRABAJADAS
 * ============================
 */
exports.getHorasTrabajadas = async (req, res) => {
    try {
        const [rows] = await conn.query(`
      SELECT 
        e.id AS edificio_id,
        e.nombre AS edificio,
        SUM(rt.horas_totales) AS horas_reales,
        e.duracion_estimada_minutos
      FROM edificios e
      LEFT JOIN registro_trabajo rt ON rt.edificio_id = e.id
      GROUP BY e.id
      ORDER BY e.nombre
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener horas trabajadas' });
    }
};

/**
 * ============================
 * 3. AUSENCIAS DEL DÍA
 * ============================
 */
exports.getAusencias = async (req, res) => {
    try {
        const [rows] = await conn.query(`
      SELECT 
        p.id,
        p.nombre,
        p.apellido,
        e.nombre AS edificio,
        pe.dia_semana
      FROM persona_edificio pe
      JOIN personas p ON p.id = pe.persona_id
      JOIN edificios e ON e.id = pe.edificio_id
      WHERE pe.dia_semana = TO_CHAR(CURRENT_DATE, 'Day')
      AND NOT EXISTS (
        SELECT 1
        FROM registro_trabajo rt
        WHERE rt.persona_id = pe.persona_id
          AND rt.fecha = CURRENT_DATE
      )
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener ausencias' });
    }
};

/**
 * ============================
 * 4. INCIDENCIAS
 * ============================
 */
exports.getIncidencias = async (req, res) => {
    try {
        const [rows] = await conn.query(`
      SELECT 
        rt.fecha,
        p.nombre || ' ' || p.apellido AS empleado,
        e.nombre AS edificio,
        f.url_foto,
        rt.observaciones
      FROM fotos f
      JOIN registro_trabajo rt ON rt.id = f.registro_trabajo_id
      JOIN personas p ON p.id = rt.persona_id
      JOIN edificios e ON e.id = rt.edificio_id
      WHERE f.tipo = 'incidencia'
      ORDER BY rt.fecha DESC
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener incidencias' });
    }
};

/**
 * ============================
 * 5. EXPORTAR HORAS (EXCEL)
 * ============================
 */
exports.exportarHorasExcel = async (req, res) => {
    const { desde, hasta } = req.query;

    try {
        const [rows] = await conn.query(`
      SELECT
        p.nombre,
        p.apellido,
        e.nombre AS edificio,
        rt.fecha,
        rt.horas_totales
      FROM registro_trabajo rt
      JOIN personas p ON p.id = rt.persona_id
      JOIN edificios e ON e.id = rt.edificio_id
      WHERE rt.fecha BETWEEN :desde AND :hasta
      ORDER BY rt.fecha DESC
    `, {
            replacements: { desde, hasta }
        });

        // El frontend convierte esto a Excel
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al exportar horas' });
    }
};

/**
 * ============================
 * 6. ESTADÍSTICAS
 * ============================
 */
exports.getEstadisticas = async (req, res) => {
    try {
        const [rows] = await conn.query(`
      SELECT
        DATE_TRUNC('month', fecha) AS mes,
        COUNT(*) AS jornadas,
        SUM(horas_totales) AS horas_totales
      FROM registro_trabajo
      GROUP BY mes
      ORDER BY mes
    `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
};

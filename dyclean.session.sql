CREATE TABLE registro_servicio (
    id SERIAL PRIMARY KEY,
    persona_id INTEGER NOT NULL,
    fecha DATE NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL,
    precio NUMERIC(10,2) NOT NULL
);

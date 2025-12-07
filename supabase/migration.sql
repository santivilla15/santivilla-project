-- Script de migración para actualizar la base de datos existente
-- Si ya tienes tablas creadas con el modelo anterior (70/30), ejecuta este SQL
-- para añadir los nuevos campos sin perder datos

-- Añadir nuevas columnas a la tabla payments (si no existen)
DO $$ 
BEGIN
    -- Añadir fixed_fee si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'fixed_fee'
    ) THEN
        ALTER TABLE payments 
        ADD COLUMN fixed_fee DECIMAL(10, 2) NOT NULL DEFAULT 1.50;
    END IF;

    -- Añadir variable_fee si no existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'payments' AND column_name = 'variable_fee'
    ) THEN
        ALTER TABLE payments 
        ADD COLUMN variable_fee DECIMAL(10, 2) NOT NULL DEFAULT 0;
    END IF;
END $$;

-- Actualizar registros existentes para calcular los nuevos campos
-- Nota: Esto recalcula fixed_fee y variable_fee basándose en el modelo nuevo
-- Si quieres mantener los datos históricos tal cual, puedes omitir este paso
UPDATE payments
SET 
    fixed_fee = 1.50,
    variable_fee = CASE 
        WHEN total_amount > 1.50 THEN 
            (total_amount - 1.50) * 0.05
        ELSE 0
    END
WHERE fixed_fee = 1.50 AND variable_fee = 0 
   OR fixed_fee IS NULL 
   OR variable_fee IS NULL;

-- Comentario: Los datos históricos con el modelo anterior (70/30) se mantienen
-- Solo los nuevos pagos usarán el modelo nuevo (1.50€ + 5%)


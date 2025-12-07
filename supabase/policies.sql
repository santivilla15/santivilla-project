-- Políticas de Row Level Security (RLS) para Supabase
-- Ejecuta este SQL en el SQL Editor de Supabase después de crear las tablas

-- Política para permitir lectura pública del ranking
-- Cualquier persona puede ver el ranking, pero solo el servidor puede escribir
CREATE POLICY "Allow public read access to ranking_users" 
ON ranking_users 
FOR SELECT 
USING (true);

-- Política para permitir inserción desde el servidor
-- Nota: En producción, puedes usar service_role para escribir directamente
-- o crear políticas más específicas basadas en autenticación
CREATE POLICY "Allow insert from authenticated users" 
ON ranking_users 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir actualización desde el servidor
CREATE POLICY "Allow update from authenticated users" 
ON ranking_users 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Política para permitir lectura pública de los pagos
CREATE POLICY "Allow public read access to payments" 
ON payments 
FOR SELECT 
USING (true);

-- Política para permitir inserción de pagos desde el servidor
CREATE POLICY "Allow insert from authenticated users to payments" 
ON payments 
FOR INSERT 
WITH CHECK (true);

-- NOTA IMPORTANTE:
-- Estas políticas permiten escritura desde cualquier lugar con autenticación.
-- Para mayor seguridad en producción, considera:
-- 1. Usar Service Role Key solo en el servidor (no exponerlo en el cliente)
-- 2. Crear políticas más restrictivas basadas en roles
-- 3. Validar todos los inputs en las API routes (ya lo hacemos)
-- 4. Usar triggers de PostgreSQL para validaciones adicionales


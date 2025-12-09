# 📖 Guía Paso a Paso: Ejecutar SQL en Supabase

## 🎯 Paso 2: Ejecutar schema.sql (Crear las Tablas)

### 1. Abrir el SQL Editor en Supabase

1. Ve a tu proyecto en [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. En el menú lateral izquierdo, busca el icono de **base de datos** o **SQL Editor**
3. Haz clic en **"SQL Editor"** o **"New query"**

### 2. Copiar el contenido de schema.sql

1. En este proyecto, abre el archivo: `supabase/schema.sql`
2. **Selecciona TODO el contenido** (Cmd+A o Ctrl+A)
3. **Copia** el contenido (Cmd+C o Ctrl+C)

### 3. Pegar y ejecutar en Supabase

1. En el SQL Editor de Supabase, **pega** el contenido (Cmd+V o Ctrl+V)
2. Verifica que el código SQL esté completo
3. Haz clic en el botón **"Run"** (o presiona **Cmd+Enter** / **Ctrl+Enter**)
4. Espera unos segundos
5. Deberías ver un mensaje de éxito: **"Success. No rows returned"** o similar

✅ **¡Listo!** Las tablas `ranking_users` y `payments` han sido creadas.

---

## 🔒 Paso 3: Ejecutar policies.sql (Configurar Políticas de Seguridad)

### 1. Abrir una nueva query

1. En el SQL Editor de Supabase, haz clic en **"New query"** (o el botón +)
2. Esto abrirá una nueva pestaña/ventana

### 2. Copiar el contenido de policies.sql

1. En este proyecto, abre el archivo: `supabase/policies.sql`
2. **Selecciona TODO el contenido** (Cmd+A o Ctrl+A)
3. **Copia** el contenido (Cmd+C o Ctrl+C)

### 3. Pegar y ejecutar en Supabase

1. En el SQL Editor de Supabase, **pega** el contenido (Cmd+V o Ctrl+V)
2. Verifica que el código SQL esté completo
3. Haz clic en el botón **"Run"** (o presiona **Cmd+Enter** / **Ctrl+Enter**)
4. Espera unos segundos
5. Deberías ver un mensaje de éxito

✅ **¡Listo!** Las políticas de seguridad (RLS) han sido configuradas.

---

## ✅ Verificar que Funcionó

### Opción 1: Verificar en Table Editor

1. En el menú lateral de Supabase, haz clic en **"Table Editor"**
2. Deberías ver dos tablas:
   - `ranking_users`
   - `payments`
3. Haz clic en cada una para ver su estructura

### Opción 2: Verificar con una Query

En el SQL Editor, ejecuta:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('ranking_users', 'payments');
```

Deberías ver ambas tablas listadas.

---

## 🐛 Si hay Errores

### Error: "relation already exists"

- **Solución**: Las tablas ya existen. Esto está bien, puedes continuar.

### Error: "permission denied"

- **Solución**: Asegúrate de estar en el proyecto correcto y tener permisos de administrador.

### Error de sintaxis

- **Solución**: 
  1. Verifica que copiaste TODO el contenido
  2. No agregues líneas extra
  3. Asegúrate de que no haya caracteres raros

### No veo las tablas

- **Solución**: 
  1. Refresca la página
  2. Verifica que ejecutaste el SQL correctamente
  3. Revisa la pestaña de "Logs" en Supabase para ver errores

---

## 📸 Imágenes de Referencia

### SQL Editor en Supabase:
```
┌─────────────────────────────────────┐
│  SQL Editor                         │
├─────────────────────────────────────┤
│                                     │
│  [Aquí pegas el código SQL]        │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  [Run] [Save] [Format]              │
└─────────────────────────────────────┘
```

### Después de ejecutar:
```
✅ Success. No rows returned
   Query executed successfully
```

---

## 🎯 Siguiente Paso

Una vez que hayas ejecutado ambos archivos SQL:

1. Ve a **Settings** → **API**
2. Copia la **Project URL** y **anon public** key
3. Agrégalas a `.env.local`
4. Reinicia el servidor: `npm run dev`

---

¿Necesitas ayuda? Revisa los logs en Supabase o consulta la documentación.


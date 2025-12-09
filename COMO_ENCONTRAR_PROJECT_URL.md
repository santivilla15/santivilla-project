# 📍 Cómo Encontrar el Project URL en Supabase

## 🎯 Método 1: Desde Settings → General (Más Fácil)

1. En el menú lateral izquierdo de Supabase
2. Haz clic en **"General"** (está arriba de "API Keys")
3. En la parte superior de la página verás:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Reference ID**: Un ID de referencia
4. Copia el **Project URL**

---

## 🎯 Método 2: Desde la Página de API

1. En la página donde estás ahora (API Keys)
2. Busca en la parte superior de la página
3. Puede aparecer como:
   - **Project URL**
   - **API URL**
   - **Project Reference**
4. El formato es: `https://[tu-proyecto-id].supabase.co`

---

## 🎯 Método 3: Desde el Dashboard Principal

1. Ve al Dashboard principal de tu proyecto
2. En la parte superior, junto al nombre del proyecto
3. Puede aparecer el Project URL o un botón para copiarlo

---

## 📋 Qué Necesitas Copiar

Necesitas **DOS cosas**:

1. **Project URL**: 
   - Formato: `https://xxxxx.supabase.co`
   - Ejemplo: `https://abcdefghijklmnop.supabase.co`

2. **anon public key** (ya lo tienes en la página de API Keys):
   - Es el "Publishable key" que viste
   - Empieza con `sb_publishable_...` o `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## ⚠️ Nota Importante

Si ves que el "Publishable key" empieza con `sb_publishable_...`, esto es una nueva versión de las claves de Supabase. 

Para este proyecto necesitamos:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: El que empieza con `sb_publishable_...` o el que empieza con `eyJ...`

---

## ✅ Después de Encontrarlos

Una vez que tengas ambos:
1. Project URL
2. anon public key (Publishable key)

Pásamelos y los agrego a `.env.local` automáticamente, o puedes agregarlos tú mismo.


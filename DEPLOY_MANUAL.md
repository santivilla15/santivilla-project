# 🚀 Guía para Deploy Manual en Vercel

## Trabajar Localmente Sin Deploys Automáticos

### 1. Desactivar Deploys Automáticos

**Opción A: Desde el Dashboard de Vercel (Recomendado)**
1. Ve a: https://vercel.com/dashboard
2. Selecciona el proyecto: `santivilla-project`
3. Ve a: **Settings** → **Git**
4. Busca la sección "Deploy Hooks" o "Automatic Deployments"
5. Desactiva "Automatic Deployments from Git"
6. O simplemente desconecta la integración de GitHub temporalmente

**Opción B: Usar una rama diferente**
- Trabaja en una rama `develop` o `local`
- Solo la rama `main` tendrá deploys automáticos
- Cuando estés listo, haz merge a `main` para desplegar

### 2. Trabajar Localmente

```bash
# Iniciar servidor de desarrollo
npm run dev

# Probar build localmente antes de desplegar
npm run build

# Si el build funciona, estás listo para desplegar
```

### 3. Hacer Deploy Manual Cuando Estés Listo

**Opción A: Desde la CLI de Vercel**
```bash
# Deploy a producción
vercel --prod

# O deploy a preview (para probar)
vercel
```

**Opción B: Desde el Dashboard de Vercel**
1. Ve a: https://vercel.com/dashboard
2. Selecciona: `santivilla-project`
3. Haz clic en: **"Deploy"** → **"Deploy from Git"**
4. Selecciona el commit que quieres desplegar
5. Haz clic en **"Deploy"**

**Opción C: Desde GitHub (cuando hagas push a main)**
- Si reactivas los deploys automáticos
- O usa un botón de deploy desde el dashboard

### 4. Ventajas de Deploy Manual

✅ **No desperdicias recursos**: Solo despliegas cuando estás listo
✅ **Builds más rápidos**: No hay colas de múltiples deploys
✅ **Mejor control**: Decides cuándo actualizar producción
✅ **Puedes probar localmente**: Asegúrate de que todo funciona antes

### 5. Flujo de Trabajo Recomendado

1. **Desarrollar localmente**: `npm run dev`
2. **Probar cambios**: Navega en `http://localhost:3000`
3. **Hacer commit**: `git add . && git commit -m "tus cambios"`
4. **Push a GitHub**: `git push origin main` (sin deploy automático)
5. **Cuando estés listo**: `vercel --prod` o desde el dashboard

### 6. Reactivar Deploys Automáticos (Opcional)

Si en el futuro quieres deploys automáticos de nuevo:
1. Ve a Settings → Git en Vercel
2. Reactiva "Automatic Deployments"
3. O reconecta la integración de GitHub

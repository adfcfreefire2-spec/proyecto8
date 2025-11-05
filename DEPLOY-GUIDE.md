# 🚀 GitHub + Netlify: Instrucciones Paso a Paso

## 📁 **Paso 1: Crear Repositorio**

### Opción A: Desde GitHub.com
1. Ve a [github.com](https://github.com) y haz login
2. Clic en **"New repository"**
3. Nombre: `monitoreo-sms-netlify`
4. Descripción: `Sistema monitoreo SMS para Netlify`
5. Selecciona **"Public"** o **"Private"** (tu elección)
6. **NO marques** "Add a README file" (ya tenemos uno)
7. Clic **"Create repository"**

### Opción B: Subir archivos existentes
1. En el repositorio vacío, clic **"uploading an existing file"**
2. Arrastra TODOS los archivos de la carpeta `netlify-github-ready`
3. Commit message: `Initial commit - Sistema monitoreo SMS`
4. Clic **"Commit changes"**

## 🔗 **Paso 2: Conectar con Netlify**

1. Ve a [app.netlify.com](https://app.netlify.com)
2. Clic **"Add new site"**
3. Selecciona **"Import an existing project"**
4. Clic **"Deploy with GitHub"**
5. **Autorizar GitHub** si es la primera vez
6. **Seleccionar tu repositorio** `monitoreo-sms-netlify`
7. Clic **"Deploy site"**

## ⚙️ **Paso 3: Configurar Build Settings**

En la pantalla de configuración:
- **Branch to deploy**: `main` (o `master`)
- **Build command**: `(dejar vacío)`
- **Publish directory**: `.` (punto)
- **Functions directory**: `netlify/functions`
- Clic **"Deploy site"**

## 📊 **Paso 4: Monitorear el Deploy**

1. **Wait 2-3 minutos** para que complete
2. Ve a **Dashboard** → **Deploys**
3. Clic en el deploy → **"Deploy details"**
4. Ve a pestaña **"Build log"** ← Aquí están los errores
5. Si es exitoso, ve a **"Functions"** → **"Logs"**

## 🚨 **Errores Comunes que Puedes Ver:**

### ✅ Éxito:
```
✔ Netlify Build completed
✔ Site published
```

### ❌ Error: Function Directory
```
Functions directory must be set
```
**Solución**: Verificar `netlify.toml` con `directory = "netlify/functions"`

### ❌ Error: Module Not Found
```
Module not found: Can't resolve 'express'
```
**Solución**: Usar versión sin dependencias (la que creé)

### ❌ Error: Build Timeout
```
Build timed out after 10 minutes
```
**Solución**: Hacer Function más simple

### ❌ Error: Network
```
npm ERR! network timeout
```
**Solución**: No usar `package.json`

## 🌐 **Paso 5: URLs Finales**

Si el deploy es exitoso, tendrás:
- **Sitio**: `https://tu-sitio.netlify.app`
- **Cliente**: `https://tu-sitio.netlify.app/index5-green.html`
- **Panel**: `https://tu-sitio.netlify.app/panel-control-optimized.html`
- **API**: `https://tu-sitio.netlify.app/.netlify/functions/sessions`

## 🧪 **Paso 6: Probar Sistema**

### Probar API directamente:
1. Ve a: `https://tu-sitio.netlify.app/.netlify/functions/sessions`
2. Debe mostrar `[]` (array vacío)
3. Si da error 404, el deploy falló

### Probar cliente:
1. Abre: `https://tu-sitio.netlify.app/index5-green.html`
2. Ingresa un número
3. Verifica que no hay errores en consola

### Probar panel:
1. Abre: `https://tu-sitio.netlify.app/panel-control-optimized.html`
2. Acceso directo - NO requiere login
3. Debe mostrar dashboard vacío (es normal al inicio)

## 🔄 **Deploys Automáticos**

Una vez configurado:
- Cada push a GitHub → deploy automático en Netlify
- Ideal para hacer cambios y ver resultados inmediatamente
- Puedes hacer commits desde la web de GitHub

## 🔍 **Ver Logs en Tiempo Real**

### Build Logs:
Dashboard → Deploys → Deploy details → "Build log"

### Function Logs:
Dashboard → Functions → "sessions" → "Logs"

### Function Tests:
Dashboard → Functions → "sessions" → "Test functions"

## 📱 **URLs de Testing**

### Crear sesión (POST):
```
curl -X POST https://tu-sitio.netlify.app/.netlify/functions/sessions \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test123","phoneNumber":"+1234567890","status":"sms_sent"}'
```

### Obtener sesiones (GET):
```
curl https://tu-sitio.netlify.app/.netlify/functions/sessions
```

### Obtener sesión específica:
```
curl https://tu-sitio.netlify.app/.netlify/functions/sessions/test123
```

## 🆘 **Si Algo Sale Mal**

### Deploy falla:
1. Ver Build log en detalles
2. Buscar error específico
3. Corregir archivo problemático
4. Hacer commit y push nuevamente

### API no funciona:
1. Ver Function logs
2. Verificar que `netlify/functions/sessions.js` existe
3. Test functions desde dashboard

### CORS error:
1. Verificar headers en Function
2. Usar URL completa en frontend

---
**⏱️ Tiempo total**: 10-15 minutos para tener todo funcionando
**🎯 Objetivo**: Deploy exitoso con logs detallados para debugging
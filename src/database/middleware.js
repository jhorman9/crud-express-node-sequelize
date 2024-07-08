import os from 'os';

export const middleware = (app) => {

    // Dirección IP permitida
    const allowedIP = process.env.IP_ADDRESS;

    // Middleware para verificar la IP del cliente
    app.use((req, res, next) => {

        // const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const clientIP = getLocalIP(); // Obtener la IP local

        if (clientIP === allowedIP) {
            next(); // Permitir el acceso
        } else {
            res.status(403).send('Acceso denegado. Solo permitido desde la IP específica.');
        }
    });

    // Middleware para verificar la clave de API
    app.use((req, res, next) => {
        const apiKey = req.headers['x-api-key'];
        // Claves de API permitidas configuradas en variables de entorno
        const allowedAPIKeys = process.env.API_KEYS.split(',');
        if(allowedAPIKeys == apiKey){
            next(); // Permitir el acceso
        }else{
            res.status(401).send('Acceso denegado. Clave de API inválida.');
        }
    });

    function getLocalIP() {
        const interfaces = os.networkInterfaces();
        let localIP = '';
    
        for (const key in interfaces) {
            const iface = interfaces[key];
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === 'IPv4' && !alias.internal) {
                    localIP = alias.address;
                }
            }
        }
    
        return localIP;
    }
}
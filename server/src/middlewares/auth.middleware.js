import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
    // buscamos los encabezados de la peticion

    const token = req.headers['authorization'];

    if(!token)
    {
        return res.status(403).json({message: "No se proporciono el acceso"});
    }

    try {
        const secretKey = 'proyecto-2026';

        // Desencriptamos el token con la clave secreta
        const decoded = jwt.verify(token, secretKey);

        //verificamos si el rol guardado cumple con los privilegios
        if(decoded.role === "admin" || decoded.role === "super-admin") {
            req.usuario = decoded;
            next();
        }
        else {
            // Si es un cliente común ("client"), le denegamos el acceso
            return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador" });
        }
        
    }
    catch(error) {
        return res.status(401).json({message: "Token invalido o expirado"});
    }
};
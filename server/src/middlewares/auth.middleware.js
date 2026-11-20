import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: "No se proporcionó el acceso" });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader;

    try {
        // Desencriptamos el token con la clave secreta
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verificamos si el rol cumple con los privilegios
        if (decoded.role === "admin" || decoded.role === "super-admin") {
            req.usuario = decoded;
            next();
        } else {
            return res.status(403).json({ message: "Acceso denegado: Se requieren permisos de administrador" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

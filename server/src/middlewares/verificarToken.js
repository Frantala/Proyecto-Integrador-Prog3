import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ 
      message: "No se proporcionó token. Acceso denegado." 
    });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader;

  try {
    // Verificamos el token con la clave secreta de entorno
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Guardamos los datos del usuario en req.usuario para usarlos después
    req.usuario = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Token inválido o expirado" 
    });
  }
};

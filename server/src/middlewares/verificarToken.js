import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ 
      message: "No se proporcionó token. Acceso denegado." 
    });
  }

  try {
    const secretKey = 'proyecto-2026';
    
    // Desencriptamos el token
    const decoded = jwt.verify(token, secretKey);
    
    // Guardamos los datos del usuario en req.usuario para usarlos después
    req.usuario = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Token inválido o expirado" 
    });
  }
};

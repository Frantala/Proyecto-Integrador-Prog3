const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    // Evaluamos si el usuario fue autenticado previamente
    if (!req.usuario) {
      return res.status(401).json({ mensaje: "Usuario no autenticado." });
    }

    // Comprobamos si el rol asignado al usuario está incluido en los roles autorizados
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ 
        mensaje:'Acceso denegado. Tu rol (${req.usuario.role}) no tiene permisos para esta acción.' 
      });
    }

    // Si tiene el rol adecuado, permitimos que continúe a la ruta
    next();
  };
};

module.exports = { verificarRol };
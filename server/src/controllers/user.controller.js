import { User } from "../models/User.js";

// Devuelve la lista completa de usuarios.
// Se limita la respuesta a los campos necesarios para no exponer contraseñas.
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
        attributes: ["id", "name", "email", "role"]
    });

    res.json(users);
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Promociona un usuario a admin usando el email enviado en el body.
export const promoteUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "El email es requerido." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.role === "super-admin") {
      return res.status(400).json({ message: "No se puede modificar el rol de un super-admin." });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "El usuario ya tiene permisos de administrador." });
    }

    await user.update({ role: "admin" });

    res.json({ message: "Permisos de administrador otorgados.", user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error en promoteUserByEmail:", error);
    res.status(500).json({ message: "Error al actualizar el rol del usuario." });
  }
};

// Demota a un usuario administrador de vuelta a usuario normal.
export const demoteUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "El email es requerido." });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.role === "super-admin") {
      return res.status(400).json({ message: "No se puede demotar a un super-admin." });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "Solo se puede demotar a usuarios que son administradores." });
    }

    await user.update({ role: "usuario" });

    res.json({ message: "Permisos de administrador revocados.", user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("Error en demoteUserByEmail:", error);
    res.status(500).json({ message: "Error al actualizar el rol del usuario." });
  }
};

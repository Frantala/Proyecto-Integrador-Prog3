import { Router } from "express";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/roleMiddleware.js";
import { getAllUsers, promoteUserByEmail, demoteUserByEmail } from "../controllers/user.controller.js";

const usersRouter = Router();

// Lista los usuarios del sistema para que el super-admin pueda ver qué emails existen.
// Responde solo con id, nombre, email y rol; no expone contraseñas.
usersRouter.get(
  "/",
  verificarToken,
  verificarRol(["super-admin"]),
  getAllUsers
);

// Promueve a un usuario a rol admin usando el email enviado en el body.
// El body debe ser { email: "usuario@example.com" }.
usersRouter.patch(
  "/promote",
  verificarToken,
  verificarRol(["super-admin"]),
  promoteUserByEmail
);

// Revoca el rol admin de un usuario usando el email enviado en el body.
// Solo los usuarios con rol super-admin pueden ejecutar esta ruta.
usersRouter.patch(
  "/demote",
  verificarToken,
  verificarRol(["super-admin"]),
  demoteUserByEmail
);

export default usersRouter;
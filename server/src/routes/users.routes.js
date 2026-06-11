import { Router } from "express";
import { User } from "../models/User.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/roleMiddleware.js";

const usersRouter = Router();

usersRouter.patch(
  "/:id/promote",
  verificarToken,
  verificarRol(["super-admin"]),
  async (req, res) => {
    const { email } = req.body;

    await User.update(
      { role: "admin" },
      { where: { id: req.params.id, email } }
    );

    res.json({ message: "Usuario promovido a admin" });
  }
);

usersRouter.patch(
  "/:id/demote",
  verificarToken,
  verificarRol(["super-admin"]),
  async (req, res) => {
    const { email } = req.body;

    await User.update(
      { role: "usuario" },
      { where: { id: req.params.id, email } }
    );

    res.json({ message: "Usuario degradado a usuario común" });
  }
);

export default usersRouter;
// aqui se declararan las rutas para las gorras 

import { Router } from 'express';
import { getProducts, seedProducts } from "../controllers/product.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/roleMiddleware.js";

const gorrasRouter = Router();

// RUTA PÚBLICA: Cualquiera puede ver los productos
gorrasRouter.get("/inicio", getProducts);

// RUTAS PROTEGIDAS: Solo para administradores

// 1. Crear producto: Requiere estar logueado Y ser admin
gorrasRouter.post("/crear", verificarToken, verificarRol(["admin", "super-admin"]), seedProducts);

// 2. Actualizar producto: Solo admin
gorrasRouter.put("/:id", verificarToken, verificarRol(["admin", "super-admin"]), seedProducts);

// 3. Eliminar producto: Solo super-admin
gorrasRouter.delete("/:id", verificarToken, verificarRol(["super-admin"]), seedProducts);

export default gorrasRouter;
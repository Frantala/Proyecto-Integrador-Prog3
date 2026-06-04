// aqui se declararan las rutas para las gorras 

import { Router } from 'express';
import { getProducts, seedProducts, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { verificarToken } from "../middlewares/verificarToken.js";
import { verificarRol } from "../middlewares/roleMiddleware.js";

const gorrasRouter = Router();

// RUTA PÚBLICA: Cualquiera puede ver los productos
gorrasRouter.get("/inicio", getProducts);

// RUTAS PROTEGIDAS: Solo para administradores

gorrasRouter.post("/seed", verificarToken, verificarRol(["admin", "super-admin"]), seedProducts); // Datos de prueba sólo para admin

gorrasRouter.put("/:id", verificarToken, verificarRol(["admin", "super-admin"]), updateProduct);
gorrasRouter.delete("/:id", verificarToken, verificarRol(["admin", "super-admin"]), deleteProduct);

export default gorrasRouter;
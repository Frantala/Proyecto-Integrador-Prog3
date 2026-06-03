// aqui se declararan las rutas para las gorras 

import { Router } from 'express';
import { getProducts, seedProducts } from "../controllers/product.controller.js";
const gorrasRouter = Router();


gorrasRouter.get("/inicio", getProducts);
gorrasRouter.post("/seed", seedProducts); // Endpoint para crear datos de prueba

export default gorrasRouter;
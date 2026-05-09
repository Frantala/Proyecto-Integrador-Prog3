// aqui se declararan las rutas para las gorras 

import { Router } from 'express';
import { getProducts } from "../controllers/product.controller.js";
const gorrasRouter = Router();

gorrasRouter.get("/inicio", getProducts); 

export default gorrasRouter;
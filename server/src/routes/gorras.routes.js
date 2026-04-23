// aqui se declararan las rutas para las gorras 

import { Router } from 'express';
import Product from "../models/Product.js"
const gorrasRouter = Router();

gorrasRouter.get("/inicio", async (req, res) => {
    try {
        const listaGorras = await Product.findAll();
        res.json(listaGorras);
    }catch (error) {
        console.error("DETALLE DEL ERROR:", error); 
    res.status(500).json({ mensaje: "Error al obtener las gorras", detalle: error.message });
    }
    
});

export default gorrasRouter;
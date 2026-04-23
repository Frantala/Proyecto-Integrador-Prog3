// aqui se declararan las rutas para las gorras 

import { Routes } from 'express';

const router = Router();

router.get("/inicio", (req, res) => {
    res.send("obteniendo libros")
});

export default router;
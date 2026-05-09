import Product from "../models/Product.js";

// Esta función reemplaza lo que tenías dentro del router.get
export const getProducts = async (req, res) => {
    try {
        const listaGorras = await Product.findAll();
        res.json(listaGorras);
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al obtener las gorras", 
            detalle: error.message 
        });
    }
};
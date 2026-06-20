import Product from "../models/Product.js";


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

// Función para agregar datos de prueba
export const seedProducts = async (req, res) => {
    try {
        const productsCount = await Product.count();
        
        // Permitir regenerar si se especifica force=true
        if (productsCount > 0 && req.query.force !== 'true') {
            return res.json({ mensaje: "Ya existen productos en la base de datos" });
        }

        // Eliminar productos anteriores si force=true
        if (productsCount > 0) {
            await Product.destroy({ where: {} });
        }

        const productosPrueba = [
            {
                nombre: "Gorra Chicago Bulls",
                marca: "New Era",
                precio: 45.99,
                stock: 20,
                imagenUrl: "/images/Gorra-Chicag-Bulls.jpeg"
            },
            {
                nombre: "Gorra Chicago Bulls Negra",
                marca: "New Era",
                precio: 35.50,
                stock: 15,
                imagenUrl: "/images/Gorra-Chicago-Bulls-Negra.jpeg"
            },
            {
                nombre: "Gorra Dodgers 59FIFTY",
                marca: "New Era",
                precio: 49.99,
                stock: 25,
                imagenUrl: "/images/Gorra-Los-Angeles-Dodgers-59FIFTY-Black.jpeg"
            },
            {
                nombre: "Gorra Dodgers Blanca",
                marca: "MLB",
                precio: 38.00,
                stock: 18,
                imagenUrl: "/images/Gorra-Los-Angeles-Dodgers-Blanca.jpeg"
            },
            {
                nombre: "Gorra Miami Dolphins",
                marca: "NFL",
                precio: 42.00,
                stock: 10,
                imagenUrl: "/images/Gorra-Miami-Dolphins.jpeg"
            },
            {
                nombre: "Gorra New York Yankees",
                marca: "Supreme",
                precio: 55.00,
                stock: 8,
                imagenUrl: "/images/Gorra-New-York-Yankees-X-Supreme.jpeg"
            },
            {
                nombre: "Gorra Oakland Athletics",
                marca: "MLB",
                precio: 39.99,
                stock: 12,
                imagenUrl: "/images/Gorra-Oakland-Athletics.jpeg"
            },
            {
                nombre: "Gorra Shohei Ohtani",
                marca: "NPB",
                precio: 48.00,
                stock: 6,
                imagenUrl: "/images/Gorra-Shohei-Ohtani-Japonesa.jpeg"
            }
        ];

        await Product.bulkCreate(productosPrueba);
        res.json({ mensaje: "Productos de prueba creados exitosamente", cantidad: productosPrueba.length });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al crear productos de prueba", 
            detalle: error.message 
        });
    }
};

export const createProduct = async (req, res) => {
    const { nombre, marca, precio, stock, imagenUrl } = req.body;

    if (!nombre || !marca || precio === undefined || stock === undefined || !imagenUrl) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (typeof nombre !== 'string' || nombre.trim().length < 3) {
        return res.status(400).json({ mensaje: "El nombre debe tener al menos 3 caracteres" });
    }

    if (typeof marca !== 'string' || marca.trim().length < 2) {
        return res.status(400).json({ mensaje: "La marca debe tener al menos 2 caracteres" });
    }

    const precioFloat = Number(precio);
    const stockInt = Number(stock);
    const imagenUrlString = String(imagenUrl).trim();

    if (!Number.isFinite(precioFloat) || precioFloat <= 0) {
        return res.status(400).json({ mensaje: "El precio debe ser un número mayor a 0" });
    }

    if (!Number.isInteger(stockInt) || stockInt < 0) {
        return res.status(400).json({ mensaje: "El stock debe ser un número entero mayor o igual a 0" });
    }

    try {
        const newProduct = await Product.create({
            nombre: nombre.trim(),
            marca: marca.trim(),
            precio: precioFloat,
            stock: stockInt,
            imagenUrl: imagenUrlString
        });

        res.status(201).json({ mensaje: "Producto creado correctamente", producto: newProduct });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al crear el producto", 
            detalle: error.message 
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, precio, stock, imagenUrl } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await product.update({ nombre, marca, precio, stock, imagenUrl });
        res.json({ mensaje: "Producto actualizado correctamente", producto: product });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al actualizar producto", 
            detalle: error.message 
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await product.destroy();
        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al eliminar producto", 
            detalle: error.message 
        });
    }
};
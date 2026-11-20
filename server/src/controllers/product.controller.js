import Product from "../models/Product.js";
import { NODE_ENV } from "../config.js";

export const getProducts = async (req, res) => {
    try {
        const listaGorras = await Product.findAll();
        res.json(listaGorras);
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al obtener las gorras"
        });
    }
};

// Función para agregar datos de prueba
export const seedProducts = async (req, res) => {
    try {
        // En producción, deshabilitar la regeneración destructiva
        if (NODE_ENV === 'production' && req.query.force === 'true') {
            return res.status(403).json({ mensaje: "Acción no permitida en entorno de producción" });
        }

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
            mensaje: "Error al crear productos de prueba"
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
            mensaje: "Error al crear el producto"
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, precio, stock, imagenUrl } = req.body;

    const productId = parseInt(id, 10);
    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ mensaje: "ID de producto inválido" });
    }

    // Validaciones de campos
    if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim().length < 3)) {
        return res.status(400).json({ mensaje: "El nombre debe tener al menos 3 caracteres" });
    }

    if (marca !== undefined && (typeof marca !== 'string' || marca.trim().length < 2)) {
        return res.status(400).json({ mensaje: "La marca debe tener al menos 2 caracteres" });
    }

    if (precio !== undefined) {
        const precioFloat = Number(precio);
        if (!Number.isFinite(precioFloat) || precioFloat <= 0) {
            return res.status(400).json({ mensaje: "El precio debe ser un número mayor a 0" });
        }
    }

    if (stock !== undefined) {
        const stockInt = Number(stock);
        if (!Number.isInteger(stockInt) || stockInt < 0) {
            return res.status(400).json({ mensaje: "El stock debe ser un número entero mayor o igual a 0" });
        }
    }

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const updateData = {};
        if (nombre !== undefined) updateData.nombre = nombre.trim();
        if (marca !== undefined) updateData.marca = marca.trim();
        if (precio !== undefined) updateData.precio = Number(precio);
        if (stock !== undefined) updateData.stock = Number(stock);
        if (imagenUrl !== undefined) updateData.imagenUrl = String(imagenUrl).trim();

        await product.update(updateData);
        res.json({ mensaje: "Producto actualizado correctamente", producto: product });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al actualizar producto"
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const productId = parseInt(id, 10);
    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({ mensaje: "ID de producto inválido" });
    }

    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await product.destroy();
        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("DETALLE DEL ERROR:", error);
        res.status(500).json({ 
            mensaje: "Error al eliminar producto"
        });
    }
};

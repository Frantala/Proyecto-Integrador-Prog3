import { useState } from "react";
import { useContext } from "react";
import { ShoppingCart, Edit, Trash2 } from "lucide-react";
import Modal_Detalles from "../Modal_Detalles/Modal_Detalles";
import EditProductModal from "./EditProductModal";
import { ThemeContext } from "../../context/ThemeContext";


function ProductCard({ product, addToCart, isAdmin, onDelete, onUpdate }) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Función para la eliminación de un producto 
  const handleDelete = () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
    onDelete(product.id);
  };

  // funcion para actualizar un producto 
  const handleSave = (updatedProduct) => {
    onUpdate(updatedProduct);
    setShowEdit(false);
  };

  return (
    <>
      <div className={`card h-100 shadow-sm hover-card ${theme === "light" ? "" : "bg-dark text-white border-secondary"}`}>
        <div className="position-relative" style={{ paddingTop: "100%", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="card-body">
          <span className={`badge text-uppercase mb-2 ${theme === "light" ? "bg-secondary" : "bg-primary"}`} style={{ fontSize: "0.7rem" }}>
            {product.category}
          </span>
          <h5 className="card-title fw-semibold mb-2">{product.name}</h5>
          <div className="mb-3">
            <span className="h4 fw-bold">${product.price}</span>
          </div>

          <div className="d-flex flex-column gap-2">
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-outline-secondary flex-fill"
                style={{ fontSize: "0.9rem" }}
                onClick={() => setShow(true)}
              >
                Ver Detalles
              </button>
              <button
                className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
                style={{ fontSize: "0.9rem" }}
                onClick={() => addToCart(product)}
              >
                <ShoppingCart style={{ width: "16px", height: "16px" }} />
                <span className="d-none d-sm-inline">Agregar</span>
              </button>
            </div>

            {isAdmin && (
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-warning flex-fill d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: "0.9rem" }}
                  onClick={() => setShowEdit(true)}
                >
                  <Edit style={{ width: "16px", height: "16px" }} />
                  Editar
                </button>
                <button
                  className="btn btn-danger flex-fill d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: "0.9rem" }}
                  onClick={handleDelete}
                >
                  <Trash2 style={{ width: "16px", height: "16px" }} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Modal_Detalles show={show} handleClose={() => setShow(false)} product={product} addToCart={addToCart} />
      <EditProductModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        product={product}
        onSave={handleSave}
      />
    </>
  );
}

export default ProductCard;

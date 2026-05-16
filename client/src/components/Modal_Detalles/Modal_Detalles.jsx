import { Modal, Button } from "react-bootstrap";
import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

function Modal_Detalles({ show, handleClose, product, addToCart }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Modal contentClassName={theme === "light" ? "" : "bg-dark text-white"} show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid mb-3"
          style={{ borderRadius: "8px" }}
        />
        <p><strong>Categoria:</strong> {product.category}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><em>Forro interno personalizado con el logo de la marca y tapa-costuras impresos</em></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => addToCart(product)}>
          <ShoppingCart style={{ width: "16px", height: "16px" }} /> Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modal_Detalles;

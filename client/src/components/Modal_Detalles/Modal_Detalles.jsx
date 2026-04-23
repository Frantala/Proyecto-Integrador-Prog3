import { Modal, Button } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";

function Modal_Detalles({ show, handleClose, product }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
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
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><em>Exclusive details about this cap model.</em></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">
          <ShoppingCart style={{ width: "16px", height: "16px" }} /> Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modal_Detalles;

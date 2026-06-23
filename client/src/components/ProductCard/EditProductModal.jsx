import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// modal para editar un producto
function EditProductModal({ show, handleClose, product, onSave }) {
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: ""
  });
  // Cuando el producto cambia, actualizamos los valores del formulario 
  useEffect(() => {
    if (product) {
      setFormValues({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || ""
      });
    }
  }, [product]);

  // Función para manejar los cambios 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar el guardado de cambios
  const handleSave = () => {
    const confirmed = window.confirm("¿Estás seguro de guardar los cambios?");
    if (!confirmed) return;

    onSave({
      id: product.id,
      name: formValues.name,
      category: formValues.category,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      image: formValues.image
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="editName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editCategory">
            <Form.Label>Marca / Categoría</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formValues.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formValues.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              min="0"
              step="1"
              value={formValues.stock}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editImage">
            <Form.Label>URL de imagen</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formValues.image}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProductModal;

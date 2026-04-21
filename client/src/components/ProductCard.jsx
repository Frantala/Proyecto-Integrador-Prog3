import { Card, Button, Badge } from 'react-bootstrap';

const ProductCard = ({ nombre, color, precio, imagen, categoria }) => {
  return (
    <Card className="h-100 border-0 shadow-sm">
      <Card.Img variant="top" src={imagen} style={{ height: '220px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="mb-2 text-uppercase" style={{ width: 'fit-content', fontSize: '0.65rem' }}>
          {categoria}
        </Badge>
        <Card.Title className="fw-bold fs-6">{nombre}</Card.Title>
        <Card.Text className="text-muted small mb-3">Color: {color}</Card.Text>
        <h4 className="fw-bold mt-auto">${precio}</h4>
        <div className="d-flex gap-2 mt-2">
          <Button variant="outline-secondary" className="w-100 btn-sm">Ver Detalles</Button>
          <Button variant="primary" className="w-100 btn-sm">🛒 Agregar</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
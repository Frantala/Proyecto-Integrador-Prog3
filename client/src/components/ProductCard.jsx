import { ShoppingCart } from 'lucide-react';

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm hover-card">
      {/* Imagen */}
      <div className="position-relative" style={{ paddingTop: '100%', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {/* Contenido */}
      <div className="card-body">
        <span className="badge bg-secondary text-uppercase mb-2" style={{ fontSize: '0.7rem' }}>
          {product.category}
        </span>
        <h5 className="card-title fw-semibold mb-2">{product.name}</h5>
        <p className="card-text text-muted mb-3" style={{ fontSize: '0.9rem' }}>
          Color: {product.color}
        </p>
        <div className="mb-3">
          <span className="h4 fw-bold">${product.price}</span>
        </div>
        {/* Botones */}
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary flex-fill" style={{ fontSize: '0.9rem' }}>
            Ver Detalles
          </button>
          <button
            className="btn btn-primary flex-fill d-flex align-items-center justify-content-center gap-2"
            style={{ fontSize: '0.9rem' }}
          >
            <ShoppingCart style={{ width: '16px', height: '16px' }} />
            <span className="d-none d-sm-inline">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
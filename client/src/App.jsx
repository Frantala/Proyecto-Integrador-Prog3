import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import { ProductCard } from './components/ProductCard';

function App() {
  const productos = [
  // Fila 1 (los que ya tenías)
  { id: 1, categoria: "CLÁSICA", nombre: "Gorra Clásica Negra", color: "Negro", precio: 24.99, img: "https://http2.mlstatic.com/D_NQ_NP_638062-MLA47138379410_082021-O.webp" },
  { id: 2, categoria: "SNAPBACK", nombre: "Gorra Snapback Azul", color: "Azul", precio: 29.99, img: "https://http2.mlstatic.com/D_NQ_NP_908323-MLA45647589531_042021-O.webp" },
  { id: 3, categoria: "TRUCKER", nombre: "Gorra Trucker Blanca", color: "Blanco", precio: 22.99, img: "https://http2.mlstatic.com/D_NQ_NP_824559-MLA44036502283_112020-O.webp" },
  { id: 4, categoria: "DEPORTIVA", nombre: "Gorra Deportiva Roja", color: "Rojo", precio: 27.99, img: "https://http2.mlstatic.com/D_NQ_NP_600277-MLA44036502281_112020-O.webp" },

  // Fila 2 (los nuevos 4)
  { id: 5, categoria: "XENEIZE", nombre: "Gorra Boca Juniors", color: "Azul y Oro", precio: 35.00, img: "https://http2.mlstatic.com/D_NQ_NP_727038-MLA48740523456_012022-O.webp" },
  { id: 6, categoria: "URBANA", nombre: "Gorra Jordan Gris", color: "Gris", precio: 32.50, img: "https://http2.mlstatic.com/D_NQ_NP_699564-MLA47872655383_102021-O.webp" },
  { id: 7, categoria: "VINTAGE", nombre: "Gorra Denim Gastada", color: "Jean", precio: 26.00, img: "https://http2.mlstatic.com/D_NQ_NP_769165-MLA47872715013_102021-O.webp" },
  { id: 8, categoria: "XENEIZE", nombre: "Gorra Boca Retro", color: "Amarillo", precio: 34.99, img: "https://http2.mlstatic.com/D_NQ_NP_619574-MLA48740523450_012022-O.webp" }
];

  return (
    <div style={{ backgroundColor: '#f0fbfc', minHeight: '100vh' }}>
      <CustomNavbar />
      <Container className="py-5">
        <h1 className="fw-bold mb-5">Nuestra Colección</h1>
        <Row xs={1} sm={2} lg={4} className="g-4">
          {productos.map((p) => (
            <Col key={p.id}>
              <Item 
                nombre={p.nombre}
                color={p.color}
                precio={p.precio}
                imagen={p.img}
                categoria={p.categoria}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
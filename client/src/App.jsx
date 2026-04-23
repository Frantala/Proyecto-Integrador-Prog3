import { useState } from 'react'; 
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import './index.css';
import CustomNavbar from './components/Navbar/navbar.jsx';
import ProductCard from './components/ProductCard/ProductCard.jsx';
import AboutUs from './pages/AboutUs/AboutUs/AboutUs.jsx'; 

// Imágenes
import bullsSnapback from './assets/Gorra-Chicag-Bulls.jpeg';
import dodgersClassic from './assets/Gorra-Los-Angeles-Dodgers.jpeg';
import Dolphins from './assets/Gorra-Miami-Dolphins.jpeg';
import OaklandAthletics from './assets/Gorra-Oakland-Athletics.jpeg';

function App() {
  const [view, setView] = useState('inicio'); 

  const products = [
    { id: 1, category: "CLASSIC", name: "Los Angeles Dodgers Classic", color: "Royal Blue", price: 24.99, image: dodgersClassic },
    { id: 2, category: "SNAPBACK", name: "Chicago Bulls Snapback", color: "Red & Black", price: 29.99, image: bullsSnapback },
    { id: 3, category: "TRUCKER", name: "Miami Dolphins Trucker", color: "White & Blue", price: 22.99, image: Dolphins },
    { id: 4, category: "SPORT", name: "Oakland Athletics Sport", color: "Black", price: 27.99, image: OaklandAthletics },
    { id: 5, category: "SPORT", name: "Miami Dolphins Cap", color: "Aqua & Orange", price: 35.00, image: "https://http2.mlstatic.com/D_NQ_NP_727038-MLA48740523456_012022-O.webp" },
    { id: 6, category: "URBAN", name: "New Era Japanese Edition Shohei Ohtani", color: "Gray", price: 32.50, image: "https://http2.mlstatic.com/D_NQ_NP_699564-MLA47872655383_102021-O.webp" },
    { id: 7, category: "VINTAGE", name: "New York Yankees x Supreme", color: "Navy", price: 26.00, image: "https://http2.mlstatic.com/D_NQ_NP_769165-MLA47872715013_102021-O.webp" },
    { id: 8, category: "RETRO", name: "Chicago Bulls Retro", color: "Red", price: 34.99, image: "https://http2.mlstatic.com/D_NQ_NP_619574-MLA48740523450_012022-O.webp" },
    { id: 9, category: "VINTAGE", name: "Los Angeles Dodgers Vintage", color: "Royal Blue", price: 26.00, image: "https://http2.mlstatic.com/D_NQ_NP_769165-MLA47872715013_102021-O.webp" },
    { id: 10, category: "CLASSIC", name: "Oakland Athletics Green Cap", color: "Green & Gold", price: 34.99, image: "https://http2.mlstatic.com/D_NQ_NP_619574-MLA48740523450_012022-O.webp" },
    { id: 11, category: "VINTAGE", name: "Oakland Athletics Vintage Cap", color: "Green", price: 26.00, image: "https://http2.mlstatic.com/D_NQ_NP_769165-MLA47872715013_102021-O.webp" }
  ];

  return (
    <div style={{ backgroundColor: '#f0fbfc', minHeight: '100vh' }}>
      {/* Paso 3: Pasar setView al Navbar */}
      <CustomNavbar setView={setView} />
      
      {view === 'inicio' ? (
        <Container className="py-5">
          <h1 className="fw-bold mb-5">Nuestra Colección</h1>
          <Row xs={1} sm={2} lg={4} className="g-4">
            {products.map((p) => (
              <Col key={p.id}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <AboutUs />
      )}
    </div>
  );
}

export default App;
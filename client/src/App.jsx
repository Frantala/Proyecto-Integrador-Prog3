import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import './index.css';
import CustomNavbar from './components/Navbar'; 
import ProductCard from './components/ProductCard';

function App() {
  const products = [
    { id: 1, category: "CLASSIC", name: "Black Classic Cap", color: "Black", price: 24.99, image: "https://http2.mlstatic.com/D_NQ_NP_638062-MLA47138379410_082021-O.webp" },
    { id: 2, category: "SNAPBACK", name: "Blue Snapback Cap", color: "Blue", price: 29.99, image: "https://http2.mlstatic.com/D_NQ_NP_908323-MLA45647589531_042021-O.webp" },
    { id: 3, category: "TRUCKER", name: "White Trucker Cap", color: "White", price: 22.99, image: "https://http2.mlstatic.com/D_NQ_NP_824559-MLA44036502283_112020-O.webp" },
    { id: 4, category: "SPORT", name: "Red Sport Cap", color: "Red", price: 27.99, image: "https://http2.mlstatic.com/D_NQ_NP_600277-MLA44036502281_112020-O.webp" },
    { id: 5, category: "XENEIZE", name: "Boca Juniors Cap", color: "Blue & Gold", price: 35.00, image: "https://http2.mlstatic.com/D_NQ_NP_727038-MLA48740523456_012022-O.webp" },
    { id: 6, category: "URBAN", name: "Gray Jordan Cap", color: "Gray", price: 32.50, image: "https://http2.mlstatic.com/D_NQ_NP_699564-MLA47872655383_102021-O.webp" },
    { id: 7, category: "VINTAGE", name: "Worn Denim Cap", color: "Denim", price: 26.00, image: "https://http2.mlstatic.com/D_NQ_NP_769165-MLA47872715013_102021-O.webp" },
    { id: 8, category: "XENEIZE", name: "Retro Boca Cap", color: "Yellow", price: 34.99, image: "https://http2.mlstatic.com/D_NQ_NP_619574-MLA48740523450_012022-O.webp" }
  ];

  return (
    <div style={{ backgroundColor: '#f0fbfc', minHeight: '100vh' }}>
      <CustomNavbar />
      <Container className="py-5">
        <h1 className="fw-bold mb-5">Our Collection</h1>
        <Row xs={1} sm={2} lg={4} className="g-4">
          {products.map((p) => (
            <Col key={p.id}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;

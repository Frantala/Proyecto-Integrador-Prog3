import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from './components/Navbar/navbar.jsx';
import ProductCard from './components/ProductCard/ProductCard.jsx';
import AboutUs from './pages/AboutUs/AboutUs/AboutUs.jsx';
import Footer from './components/Footer/Footer.jsx';
import Login from './pages/Login/Login.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje de carga

  useEffect(() => {
    const fetchGorras = async () => {
      try {
        // Pedimos los datos a tu servidor
        const response = await fetch('http://localhost:3000/api/inicio');
        if (!response.ok) throw new Error("Error en la respuesta del servidor");
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al traer las gorras:", error);
        setLoading(false);
      }
    };

    fetchGorras();
  }, []);

  return (
    <Router>
      <div style={{ backgroundColor: "#f0fbfc", minHeight: "100vh" }}>
        <CustomNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <Container className="py-5">
                <h1 className="fw-bold mb-5">Nuestra Colección</h1>
                
                {loading ? (
                  <p>Cargando...</p>
                ) : (
                  <Row xs={1} sm={2} lg={4} className="g-4">
                    {products.map((p) => (
                      <Col key={p.id}>
                        <ProductCard 
                          product={{
                            id: p.id,
                            name: p.nombre,
                            stock: p.stock,
                            price: p.precio,
                            image: p.imagenUrl,
                            category: p.marca
                          }} 
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </Container>
            }
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
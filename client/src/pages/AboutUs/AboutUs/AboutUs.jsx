import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  const team = [
    { 
      name: "Franco Talarico", 
      bio: "Especialista en arquitectura de software y optimización de rendimiento para aplicaciones escalables." 
    },
    { 
      name: "Juan Amprimo", 
      bio: "Encargado de la experiencia de usuario, asegurando que cada interacción en la web sea intuitiva." 
    },
    { 
      name: "Mateo Martin", 
      bio: "Desarrollador enfocado en modelado 3D, fusionando la programación con el diseño de personajes." 
    }
  ];

  return (
    <div style={{ backgroundColor: '#f0fbfc', minHeight: '100vh' }} className="py-5">
      <Container>
        {/* Encabezado */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4">Sobre Hustlery</h1>
          <p className="lead text-muted">Innovación y estilo en cada detalle.</p>
        </div>

        {/* Misión y Visión */}
        <Row className="mb-5 g-4">
          <Col md={6}>
            <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-4 border-info">
              <h2 className="fw-bold text-primary">Nuestra Misión</h2>
              <p>
                Nuestra misión es empoderar el estilo personal a través de accesorios urbanos de alta calidad que representen la cultura de la calle. Buscamos ofrecer a nuestra comunidad las herramientas para expresarse con actitud, brindando diseños exclusivos que combinan tendencia, comodidad y el espíritu de superación constante.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-4 border-info">
              <h2 className="fw-bold text-primary">Nuestra Visión</h2>
              <p>
                Convertirnos en el referente principal del "headwear" urbano a nivel regional, siendo reconocidos no solo por la calidad de nuestras gorras, sino por crear una comunidad auténtica que valore el esfuerzo y el estilo de vida de la cultura urbana. Queremos que Hustlery sea un símbolo de identidad para quienes construyen su propio camino todos los días.
              </p>
            </div>
          </Col>
        </Row>

        {/* Sección del Equipo (Sin Roles) */}
        <h2 className="fw-bold mb-4 text-center">Desarrolladores</h2>
        <Row className="justify-content-center g-4">
          {team.map((member, index) => (
            <Col key={index} md={4}>
              <Card className="card h-100 border-0 shadow-sm text-center p-4 hover-card">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div 
                    className="rounded-circle bg-primary mb-3 d-flex align-items-center justify-content-center shadow-sm" 
                    style={{ width: '90px', height: '90px', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <Card.Title className="fw-bold fs-4 mb-3">{member.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {member.bio}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
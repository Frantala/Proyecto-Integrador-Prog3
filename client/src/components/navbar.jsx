import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info fixed-top">
      <div className="container-fluid">
        {/* Marca */}
        <a className="navbar-brand fw-bold" href="#">CapStyle</a>

        {/* Botón hamburguesa para móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>

          {/* Íconos a la derecha */}
          <div className="d-flex">
            <a href="#" className="nav-link">
              <i className="bi bi-cart"></i> {/* carrito */}
            </a>
            <a href="#" className="nav-link">
              <i className="bi bi-person"></i> {/* perfil */}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

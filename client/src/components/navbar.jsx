import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/logo-hustlery.png';               

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-bg fixed-top">
      <div className="container-fluid">
        {/* Marca con logo */}
        <a className="navbar-brand fw-bold" href="#">
          <img 
            src={logo} 
            alt="CapStyle Logo" 
            height="40" 
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Botón hamburguesa */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link hover-nav active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link hover-nav" href="#">Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link hover-nav" href="#">Contacto</a>
            </li>
          </ul>

          {/* Íconos a la derecha */}
          <div className="d-flex">
            <a href="#" className="nav-link hover-nav">
              <i className="bi bi-cart"></i>
            </a>
            <a href="#" className="nav-link hover-nav">
              <i className="bi bi-person"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

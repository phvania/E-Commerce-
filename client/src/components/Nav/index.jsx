import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AuthService from '../../utils/auth';
import { Navbar, Nav } from 'react-bootstrap';

const isAdmin = AuthService.checkAdmin();

function MyNav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Nav className="ml-auto align-items-center">
          <Nav.Item className="mx-1">
            {isAdmin ? (
              <Link to="/viewOrders" className="nav-link">
                View Orders
              </Link>
            ) : (
              <Link to="/orderHistory" className="nav-link">
                Order History
              </Link>
            )}
          </Nav.Item>
          <Nav.Item className="mx-1">
            <a href="/" onClick={() => Auth.logout()} className="nav-link">
              Logout
            </a>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/sales" className="nav-link">
              Sales
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/Search" className="nav-link">
              Search
            </Link>
          </Nav.Item>
        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto align-items-center">
          <Nav.Item className="mx-1">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/sales" className="nav-link">
              Sales
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/Search" className="nav-link">
              Search
            </Link>
          </Nav.Item>
        </Nav>
      );
    }
  }

  return (
    <Navbar style={{ backgroundColor: '#9DC888' }} expand="lg">
      <Navbar.Brand>
        <Link to="/" className="nav-link">
          <span role="img" aria-label="shopping bag">🛍️</span>
          UFTShop
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {showNavigation()}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNav;

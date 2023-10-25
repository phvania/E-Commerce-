import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AuthService from '../../utils/auth';

const isAdmin = AuthService.checkAdmin();

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        
        <ul className="d-flex justify-content-end " >
          <li className="mx-1">
            {isAdmin ? (
              <Link to="/viewOrders">View Orders</Link>
            ) : (
              <Link to="/orderHistory">Order History</Link>
            )}
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/sales">
              Sales
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/Search">
              Search
            </Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="d-flex justify-content-between flex-wrap">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/sales">
              Sales
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/Search">
              Search
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="d-flex justify-content-between px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          UFTShop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;

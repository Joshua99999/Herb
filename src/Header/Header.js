//import { FaArrowAltCircleLeft } from "react-icons/fa";
//import '../App.css';

// import '../expenditure.css';
// import 'img/h'
import * as HERBUI from "react-bootstrap";
import { FiPower, FiHome } from "react-icons/fi";
import { IoAlertOutline } from "react-icons/io5";
import '../payroll.css';
import { useDispatch } from 'react-redux';
import { LOGOUT } from "../store/actions";

const Header = () => {
  // let history = useHistory();

  const dispatcher = useDispatch();

  const logout = () => {
    localStorage.removeItem('datta-account');
    dispatcher({ type: LOGOUT });
  }


  return (
    <HERBUI.Container fluid>
      <HERBUI.Row>
        <HERBUI.Navbar collapseOnSelect expand="lg" fixed="top" className="HERB-Top-Nav" style={{ posistion: "fixed", top: "0px" }} >
          <HERBUI.Navbar.Brand href="#home">
            <img
              src="../img/herb.svg"
              width="210"
              height="40"
              className="d-inline-block align-top"
              alt="HERB"
            />
          </HERBUI.Navbar.Brand>
          <HERBUI.Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <HERBUI.Navbar.Collapse id="responsive-navbar-nav">
            <HERBUI.Nav className="me-auto"></HERBUI.Nav>
            <HERBUI.Nav>
              {/* <HERBUI.Nav.Link href="#"  onClick={history.goBack} className="icon-size-header"><BiArrowBack/> </HERBUI.Nav.Link> */}
              <HERBUI.Nav.Link href="/home" className="icon-size-header"><FiHome /></HERBUI.Nav.Link>
              <HERBUI.NavDropdown
                title=" User Settings&emsp;&emsp;"
                id="basic-nav-dropdown"
              >

                <HERBUI.NavDropdown.Item href="#About">
                  <IoAlertOutline /> About
                </HERBUI.NavDropdown.Item>
                <HERBUI.NavDropdown.Divider />
                <HERBUI.NavDropdown.Item href="#Sign Out" onClick={logout}>
                  <FiPower /> Sign Out
                </HERBUI.NavDropdown.Item>
              </HERBUI.NavDropdown>
            </HERBUI.Nav>
          </HERBUI.Navbar.Collapse>
        </HERBUI.Navbar>
      </HERBUI.Row>
    </HERBUI.Container>
  );
}
export default Header;

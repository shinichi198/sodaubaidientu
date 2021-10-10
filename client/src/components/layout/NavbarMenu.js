import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { AuthContext } from "../../contexts/AuthContext";
const NavbarMenu = () => {
  const {
    authState: {
      user: { username, role },
    },
    logoutUser,
  } = useContext(AuthContext);
  const logOut = () => {
    logoutUser();
  };
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        TRƯỜNG THPT NGHÈN
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {
            <Nav.Link
              className="font-weight-bolder text-white"
              to="/class"
              as={Link}
            >
              Lớp học
            </Nav.Link>
          }
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/subject"
            as={Link}
          >
            Môn học
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/addlockclass"
            as={Link}
          >
            Cập nhật lớp để khóa
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/week"
            as={Link}
          >
            Tuần
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/lockclass"
            as={Link}
          >
            Khóa sổ đầu bài
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Sổ đầu bài
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={logOut}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;

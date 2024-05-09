import React from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/">
          <img
            src={require("../../images/logo.png")}
            alt="logo"
            style={{ width: "125px", height: "120px", marginRight: "350px" }}
          />
          {/* <h3>FMA Airlines Management</h3> */}
        </NavLink>
        <NavMenu>
          <NavLink to="/BookTicket">View Flights</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact-us">Contact</NavLink>
          {/* Placed the Sign Up and Sign In links beside the Contact link */}
          <NavLink to='/sign-up'>Sign Up</NavLink>
          <NavLink to='/CustomerSignin'>Sign In</NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Navbar;

import React, { useState, Component } from 'react'
import { Link } from '@reach/router'
import '../styles/Nav.css'
import { FaHome } from "react-icons/fa";
import { FaGavel } from 'react-icons/fa';
import { FaProductHunt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sideBar: false
        }
        this.showSidebar = this.showSidebar.bind(this);
    }
    
    showSidebar() {
        if (document.getElementById('nav-menu').style.height === '0px') {
            document.getElementById('cont').style.display = "block"
            document.getElementById('nav-menu').style.height = 'auto'
        } else {
            document.getElementById('cont').style.display = "none"
            document.getElementById('nav-menu').style.height = '0px';
        }
    }

    render() {
        return (
            <div>
                <div className="Nav-container" style={{ display: "flex", justifyContent: "space-between", width: "100%", backgroundColor: "rgba(0,163,202,255)" }}>
                    <div className="Menu-bar">
                        <span onClick={this.showSidebar}><FaBars /></span>

                    </div>
                    <div className="Nav">
                        <Link className="Nav-links" to="/"><span className="linkText"><FaHome className="fa" />Home</span></Link>
                        <Link className="Nav-links" to="/contact"><span className="linkText"><FaPhone />Contacts</span></Link>
                        <Link className="Nav-links" to="/auction"><span className="linkText"><FaGavel />Auction</span></Link>
                        <Link className="Nav-links" to="/products"><span className="linkText"><FaProductHunt />Products</span></Link>
                    </div>
                    <div className="nav-section-two" style={{ width: "20%", padding: "20px" }}>
                        <a href="/kill"><span style={{ color: "white" }}>Logout</span></a>
                    </div>

                </div>
                {/* <BarLinks /> */}
                <nav id="nav-menu">
                    <ul className="nav-manu-items" id="cont">
                        <li className="navbar-toggle">
                            <Link to="/" className="menu-hover"><span ><FaHome />Home</span></Link>
                            <Link to="/contact" className="menu-hover"><span><FaPhone />Contacts</span></Link>
                            <Link to="/auction" className="menu-hover"><span><FaGavel />Auction</span></Link>
                            <Link to="/products" className="menu-hover"><span><FaProductHunt />Products</span></Link>
                            <Link to="/kill" className="menu-hover"><span>My Account</span></Link>
                            <Link to="/kill" className="menu-hover"><span>Logout</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>

        )
    }
}

export default Nav

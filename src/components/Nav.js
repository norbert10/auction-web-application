import React, { Component } from 'react'
import { Link } from '@reach/router'
import '../styles/Nav.css'
import { FaHome} from "react-icons/fa";
import { FaGavel} from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaBars } from 'react-icons/fa';
export class Nav extends Component {
    render() {
        return (
            <div className="Nav-container" style={{display:"flex",justifyContent:"space-between",width:"100%",backgroundColor:"rgba(0,163,202,255)"}}>
                <div className="Menu-bar">
                    <a href="#" ><span><FaBars /></span></a>
                </div>
                <div className="Nav">
                    <Link className="Nav-links" to="/"><span className="linkText"><FaHome className="fa"/>Home</span></Link>
                    <Link className="Nav-links" to="/contact"><span className="linkText"><FaPhone />Contacts</span></Link>
                    <Link className="Nav-links" to="/auction"><span className="linkText"><FaGavel />Auction</span></Link>
                    <Link className="Nav-links" to="/products"><span className="linkText"><FaProductHunt />Products</span></Link>
                </div>
                <div className="nav-section-two" style={{width:"20%",padding:"20px"}}>
                    <a href="/kill"><span style={{color:"white"}}>Logout</span></a>
                </div>
            </div>
        )
    }
}

export default Nav

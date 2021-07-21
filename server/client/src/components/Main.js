import React, { Component } from 'react'
import { Router } from '@reach/router'
import Contact from '../components/Contact';
import Landing from '../components/Landing';
import Auction from '../components/Auction';
import Nav from '../components/Nav';
import About from '../components/About'
import Products from '../components/Products'


export class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Nav/>
                <Router>
                    <Landing path="/" />
                    <Contact path="/contact" />
                    <Auction path="/auction" />
                    <Products path="/products" />
                    <About path="/about" />
                </Router>

            </div>
        )
    }
}

export default Main

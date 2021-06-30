import React, { Component } from 'react'
import { Router } from '@reach/router'
import Contact from '../components/Contact';
import Landing from '../components/Landing';
import Auction from '../components/Auction';
import Nav from '../components/Nav';


export class Main extends Component {
    render() {
        return (
            <div className="Main">
                <Nav/>
                <Router>
                    <Landing path="/" />
                    <Contact path="/contact" />
                    <Auction path="/auction" />
                </Router>

            </div>
        )
    }
}

export default Main

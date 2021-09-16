import React, { Component } from 'react'
import '../styles/Feeds.css'

export class Feeds extends Component {
    render() {
        return (
            <div className="feeds">
                <div>
                    <h4>messages</h4>
                </div>
                <div>
                    <h4>Ratings</h4>
                    <div>Excellent</div>
                    <div>Good</div>
                    <div>Fair</div>
                    <div>Poor</div>
                </div>
            </div>
        )
    }
}

export default Feeds

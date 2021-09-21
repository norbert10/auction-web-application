import React, { Component } from 'react'
import '../styles/Feeds.css'
import axios from 'axios';

export class Feeds extends Component {
    constructor(props) {
        super(props);
        this.state = {

            feeds: []
        }
        this.messages = this.messages.bind(this);
    }

    componentDidMount() {
        this.messages();
    }

    messages(e) {
        axios.get('/allmessages')
            .then((res) => {
                this.setState({
                    feeds: res.data
                })

            })
            .catch((err) => {
                alert(err.message)
            });
    }


    render() {
        return (
            <div className="feeds">
                <div>
                    <h4>MESSAGES</h4>
                    <thead>
                        <tr>
                            <td>Username</td>
                            <td>Phone number</td>
                            <td>Email Address</td>
                            <td>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.feeds.map((d, index) => (
                                <tr>
                                    <td>{d.firstname}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.email}</td>
                                    <td>{d.message}</td>
                                </tr>
                            ))
                        }
                    </tbody>
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

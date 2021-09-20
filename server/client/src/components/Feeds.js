import React, { Component } from 'react'
import '../styles/Feeds.css'
import axios from 'axios';

export class Feeds extends Component {
    constructor(props){
        super(props);
        this.state ={
    
            feeds : []
        }
        this.messages=this.messages.bind(this);
    }

    componentDidMount(){
        this.messages();
    }

    messages(e){
        axios.get('/allmessages')
        .then((res)=>{
            this.setState({
                feeds: res.data
            })

        })
        .catch((err)=>{
            alert(err.message)
        });
    }
 

    render() {
        return (
            <div className="feeds">
                <div>
                    <h4>messages</h4>
                    {this.state.feeds.map((d, index)=>(
                       <div>
                           <span>{d.firstname}</span>
                           <span>{d.phone}</span>
                           <span>{d.email}</span>
                           <span>{d.message}</span>
                       </div> 
                    ))
                }
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

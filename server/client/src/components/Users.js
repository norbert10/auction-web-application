import React, { Component } from 'react'
import axios from 'axios'

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            phoneNo: '',
            email: '',
            users: []
        }
    }

    sysUsers(e){
        e.preventDefault();
        axios.get('/users', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            pass: this.state.password,
            phone: this.state.phoneNo,
            email: this.state.email
          })
            .then((res) => {
              this.setState({
                users: res.data
              })
            })
            .catch((err) => {
              alert(err.message);
            })

    }
    render() {
        return (
            <div>
                users
            </div>
        )
    }
}

export default Users

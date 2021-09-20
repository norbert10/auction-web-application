import React, { Component } from 'react'
import axios from 'axios'
import '../styles/Users.css'

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      password: '',
      phoneNo: '',
      email: '',
      users: [],
      isDeleted: false,
      deleteId: ''
    }
    this.systemUsers = this.systemUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
  }

  componentDidMount() {
    this.systemUsers();
  }
  //to see system users
  systemUsers() {
    axios.get(`/users`)
      .then((res) => {
        this.setState({ users: res.data })
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  //delete user from the database
  deleteUser() {
    console.log("clicked")
    axios.post(`/delete`, {
      id: this.state.deleteId
    })
      .then((res) => {
        alert("One user deleted")
        this.setState({ isDeleted: true })
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value })
  }



  render() {
    return (
      <div>
        <div className="users-list">
          <h2 className="users-header">USERS</h2>
          <div className="users-and-delete">
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }} className="users" >
              <thead>
                <tr>
                  <td>User_Id</td>
                  <td>Firstname</td>
                  <td>Lastname</td>
                  <td>Password</td>
                  <td>Phone number</td>
                  <td>Email</td>
                  <td>Admin</td>
                </tr>
              </thead>
              <tbody>
                {

                  this.state.users.map((user, index) => (
                    <tr>
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.pass}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.admin}</td>
                      {/* <td><button onClick={this.deleteUser}>delete</button></td>
                      <td><button>edit</button></td> */}
                    </tr>

                  ))
                }
              </tbody>
            </div>
            <div className="delete">
              <h2>DELETE USER</h2>
              <input type="text" name="deleteId" className="delete-box" placeholder="Enter User Id"value={this.state.deleteId} onChange={this.changeHandler} />
              <input type="button" value="delete" className="delete-btn" onClick={this.deleteUser} />
              {/* <button onClick={this.deleteUser}>delete</button> */}
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default Users

import React, { Component } from 'react'
import axios from 'axios';

export class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            searchKey: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }
    changeHandler(e) {
        this.setState({ searchKey: e.target.value },()=>{
            this.onChangeSearch()
        })
    }

    onChangeSearch() {
        axios.post(`/results`, {searchkey: this.state.searchKey})
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                alert(err.message);
            })
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.changeHandler} value={this.state.searchKey} />
                <ul>
                    {this.state.data.map((d, i) => (
                        <li key={i}> {d.name} {d.category}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Search
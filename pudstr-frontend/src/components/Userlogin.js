import React, {Component} from 'react';
import { Redirect } from 'react-router';
const BASE_URL = 'http://localhost:3000';

export default class UserLogin extends Component{
	state={
		input: '',
		fireRedirect: false,
		alreadyUser:true,
		user:{},
		visible:true
	}

	handleChange = (e) => {
		this.setState({
			input: e.target.value
		}, () => console.log(this.state.input))
	}

	handleCreateSubmit = (event) => {
		event.preventDefault()
		fetch(`${BASE_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.input,
				points: 0,
				favorites: ''
			})
		})
		.then((res) => res.json())
		.then(json => {
			console.log('submit stuff')
		})
	}

	handleGetSubmit=(event)=>{
		event.preventDefault()
		fetch(`${BASE_URL}/users`)
		.then(res=>res.json())
		.then(json=>this.parseInfo(json))
	}

	parseInfo=(json)=>{
		console.log(this.state.input)
		let jsonArray=json.find((user)=>{
			return this.state.input===user.name
		})
		this.setState({
			user:jsonArray
		},()=>console.log(this.state.user))
		this.setState({
			visible: false
		})
	}

	handleCreateClick=()=>{
		this.setState({
			alreadyUser:!this.state.alreadyUser
		})
	}

	handleBackClick=()=>{
		this.setState({
			alreadyUser:!this.state.alreadyUser
		})
	}


	render(){
		return(
			<div>
				{this.state.visible ? null : <Redirect to="/dash" /> }
				{this.state.alreadyUser ?
					<form onSubmit={this.handleGetSubmit}>
						<br/>
						<label>Log In</label><br/>
						<input type="text" placeholder="name" name="name" onChange={this.handleChange}/>
						<input type="submit"/>
						<p onClick={this.handleCreateClick}>Not a User? Make new account</p>
					</form>  :
					<form onSubmit={this.handleCreateSubmit}>
						<br/>
						<label>Create New Account</label>
						<br/>
						<input type="text" placeholder="Enter Name" name="name" onChange={this.handleChange}/>
						<input type="submit"/>
						<p onClick={this.handleBackClick}>Back</p>
					</form>}
			</div>
		)
	}
}

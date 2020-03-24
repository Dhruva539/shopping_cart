import React, { Component } from 'react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error:{}
      
    }
  }

  handleChange = (e) => {
    let { target: { name, value } } = e;
    this.setState({
      [name]: value
    })
  }

  handleLogin =(e) =>{
    let {error} = this.state;
    let name=e.target.name;
    if(!this.state.username || !this.state.password) {
      error[name]="Please fill login information";
      this.setState({
        error
      })
    } else {
      this.props.setLogin();
    }
  }

  handleFocus =(e) =>{
    let name = e.target.name;
    let {error} = this.state;
    error[name]="";
    this.setState({
      error
    })
  }

  handleBlur=(e) =>{
    let {target:{name,value}} =e;
    let errorMsg="";
    let {error} = this.state;
    if(!value){
      errorMsg=`Please enter the ${name}`;
    } 
    error[name]=errorMsg;
    this.setState({
      error
    })       
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-2 col-lg-2">
            <label>Username:</label>
          </div>
          <div className="col-md-6 col-lg-6">
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
              name="username"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
          {
             this.state.error['username'] &&
            <p style={{color:"red",fontSize:"11px",fontWeight:"bold"}}>{this.state.error['username']}</p>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-lg-2">
            <p>Password:</p>
          </div>
          <div className="col-md-6 col-lg-6">
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
            {
             this.state.error['password'] &&
            <p style={{color:"red",fontSize:"11px",fontWeight:"bold"}}>{this.state.error['password']}</p>
            } 
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-lg-2">
            <button 
             className="btn btn-danger"
              onClick={this.handleLogin}
              name="login"
             >Login</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6">
          {
             this.state.error['login'] &&
            <p style={{color:"red",fontSize:"11px",fontWeight:"bold"}}>{this.state.error['login']}</p>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;
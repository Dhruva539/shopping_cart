import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Route, Link } from 'react-router-dom';
import { history } from './history';
import Login from './login/Login';
import {Temp} from './functional/temp';
import {PrivateRoute} from './routes/PrivateRoute';
import HomePage from './components/HomePage';
import Temp1 from './Temp1';
class App extends Component {

  constructor(props) {
    super(props)
    this.state={
  
    }
  }

  componentWillMount(){
  //   let wait= time => new Promise(() =>{
  //     setTimeout(()=>{
  //       this.setState((prevState,props)=>{
  //       console.log("Previous state" +prevState,props);
  //       return {counter:1}
  //     })
  //     },time)
      
  //   })
  //  wait(3000).then(a=>console.log("State is mutated"))   
  console.log("Inside the componentWillMount");
  this.setState((prevState,props)=>{
           console.log("Previous state" +prevState,props);
           return {counter:0} 
})
  
}
componentDidMount(){
  console.log("Inside the component Did mount")
    let wait= time => new Promise(() =>{
      setTimeout(()=>{
        this.setState((prevState,props)=>{
        console.log("Previous state" +prevState,props);
        return {counter:1}
      })
      },time)
      
    })
   wait(0).then(a=>console.log("State is mutated"))  
}
componentWillUnmount() {
  console.log("Compount will be unmounted ")
}
  handleClick =() =>{
    
    this.setState((prevState,props)=>{
      console.log("Previous state" +prevState.counter,props);
      return {counter:prevState.counter+1}
    })
  }
  render() {
  //  const auth = true;
  let {counter} = this.state
    return (
      // <Router history={history}>
      //   <div className="container">
      //   <PrivateRoute exact path="/" component={HomePage} />
      //   <Route path="/login" component={Login} />
      //   </div>
        
      // </Router>
      <div onClick={this.handleClick}>
      Counter Value is : {counter}
       <Temp1 counter={counter}/>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import CourseContentComponent from './CourseContentComponent';

class LayoutComponent extends Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <React.Fragment>
         {/* <Header /> */}
         <CourseContentComponent />
         </React.Fragment>
      )
    }
}
export default LayoutComponent;
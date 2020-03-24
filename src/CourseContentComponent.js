import React, { Component } from 'react';
import sampleInput from './json/sampleCourses.json';
import ModalComponent from './ModalComponent/ModalComponent';
import Login from './Login';
class CourseContentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddToCart: false,
      hoveredChildIndex: null,
      showOptions: false,
      filteredOptions: [],
      courses: sampleInput.courses,
      searchContent: "",
      filteredCourses: [],
      addToCartList: [],
      cartItemCount: 0,
      isAuthenticated:false,
      selectedCourseId:""
    }
  }

  handleMouseEnter = (e, index) => {
    e.stopPropagation();
    this.setState({ showAddToCart: true, hoveredChildIndex: index })
  }

  handleMouseLeave = (e) => {
    e.stopPropagation();
    this.setState({ showAddToCart: false, hoveredChildIndex: null })
  }

  handleChange = (e) => {
    let { target: { value } } = e;
    let courses = [...this.state.courses];
    let filterOpt = []
    if (value) {
      courses.forEach(course => {
        course.lessons.forEach(lesson => {
          let filtObj = {};
          if (lesson.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
            filtObj.id = lesson.id;
            filtObj.name = lesson.name;
            filterOpt.push(filtObj)
          }
        })
      })

    }
    this.setState({
      filteredOptions: filterOpt,
      showOptions: filterOpt.length > 0 ? true : false,
      searchContent: value
    })
  }

  // Check if user is authenticated and add course to cart.
  addCourseToCartList = (e) => {
    let id = e.target.value;
    let {isAuthenticated} = this.state;
    if(!isAuthenticated) {
      this.setState({
        selectedCourseId:id
      },() =>{
        this.loginModal.openModal();
        })
    
    } else {
      id && this.addToList(id);
    }    
  }

  addToList= (id) =>{
    let { addToCartList, courses, cartItemCount } = this.state;
    let lessonObj = null;
    courses.forEach(course => {
      course.lessons.forEach(lesson => {
        if (lesson.id === id) {
          lessonObj = lesson;
        }
      })
    })
    if (lessonObj) {
      addToCartList.push(lessonObj);
    }
    this.setState({
      addToCartList,
      cartItemCount: cartItemCount + 1
    })
  }

  // Remove course from cart
  removeFromCart = (e) => {
    let { addToCartList, courses, cartItemCount } = this.state;
    let courseId = e.target.value;
    let index = addToCartList.findIndex(obj => obj.id === courseId);
    let newList = [...addToCartList.slice(0, index), ...addToCartList.slice(index + 1)];
    this.setState({
      addToCartList: [...newList],
      cartItemCount: cartItemCount - 1
    })
  }

  // Render courses in content section
  displayCourses = () => {
    let lessonList = [];
    let { courses, addToCartList } = this.state;
    let isAlreadyAddedInCart = false;
    courses.forEach((course, courseIndex) => {
      course.lessons.forEach((lesson, lessonIndex) => {
        let lessonFindIndex = addToCartList.findIndex(lsn => lsn.id === lesson.id);
        console.log(lessonFindIndex);
        isAlreadyAddedInCart = lessonFindIndex > -1 ? true : false;
        lessonList.push(
          <div
            className="col-sm-3 col-md-3 col-lg-3"
            style={{ marginRight: "10px", marginBottom: "10px" }}
            key={lesson.name}
            onMouseEnter={(e) => this.handleMouseEnter(e, lessonIndex)}
            onMouseLeave={this.handleMouseLeave}
          >
            <div className="card" style={{ width: "18rem" }}
            >
              <img src={lesson.image} className="course-img" />
              <div className="card-body">
                <h5 className="card-title">{lesson.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{lesson.author}</h6>
                <p className="card-text">{lesson.description}</p>
                <p className="card-text">{`Published:${lesson.publishDate}`}</p>
                <p className="card-text">{`Duration:${lesson.duration}`}</p>
                <div className="clearfix"></div>
                {
                  this.state.showAddToCart && (this.state.hoveredChildIndex === lessonIndex)
                  && !isAlreadyAddedInCart &&
                  <div className="addcart">
                    <button value={lesson.id}
                      onClick={this.addCourseToCartList}>
                      Add to Cart
                      </button>
                  </div>
                }
                {
                  this.state.showAddToCart && (this.state.hoveredChildIndex === lessonIndex) && isAlreadyAddedInCart &&
                  <div className="addcart">
                    <button
                      value={lesson.id}
                      onClick={this.removeFromCart}
                    >Remove From Cart</button>
                  </div>
                }
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        )
      })
    })
    return lessonList;
  }

  selectCourse = (e) => {

  }

  // set isAuthenticated if user is logged in
 setLogin =() =>{
   this.setState({
    isAuthenticated:true
   },()=>{
    this.loginModal.closeModal();
    this.state.selectedCourseId && this.addToList(this.state.selectedCourseId);
   })

 }

  render() {
    let { showOptions, filteredOptions, cartItemCount } = this.state;
    return (
      <div>
        <ModalComponent
           ref={
             r =>{
               this.loginModal=r;
             }
           }
           modalTitle={"Login"}
           modalId={"loginModal"}
           showFooter={false}
           footerContent={false}   
        >
             <Login setLogin={this.setLogin}/>
        </ModalComponent>
        <div className="header-section">
          <div className="header-logo">Header Logo</div>
          <div className="header-left">
            <input type="text"
              placeholder="Search Course hear"
              className="form-control"
              onChange={this.handleChange}
              value={this.state.searchContent}
            />
            {
              showOptions &&
              <div className="courses-sugg-list">
                {
                  filteredOptions.map(option => (
                    <div key={option}
                      className="courses-sugg-list-item"
                      value={option.id}
                      onClick={this.selectCourse}
                    >
                      {option.name}
                    </div>
                  ))
                }
              </div>
            }
            <span>
              <button className="search-course btn btn-danger">
                <span className="search-symbol"></span>
              </button>
            </span>
          </div>
          <div className="header-right">
            <img src="/icons/add-cart.png" className="cart-icon" />
            <span style={{ color: "blue", fontSize: "13px" }}>{cartItemCount}</span>
          </div>
        </div>
        <div className="container" style={{ marginTop: "20px" }}>
          <div className="row">
            {this.displayCourses()}
          </div>
        </div>
      </div>
    );
  }

}
export default CourseContentComponent;
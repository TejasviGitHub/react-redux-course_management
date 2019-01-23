import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from "react-router";
//connect promotes the class components to be container components by providing acccess to store
//via Provider

class CoursesPage extends React.Component {
  constructor(props, context)
  {
    super(props, context);

    //better way to use bind here rather than inline function(in render method) which helps in better performance
    this.courseRow = this.courseRow.bind(this);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  render(){
    //destructuring here.
    const {courses} = this.props;
    return(
      <div>
        <h1>Courses</h1>
        <input type="submit"
               value="Add Course"
               className="btn btn-primary"
               onClick={this.redirectToAddCoursePage} />
        <CourseList courses={courses}/>
      </div>
    );
  }
}

//validations (two props on this component)
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//ownProps - props that are attached to its own component. component ownProps
//mostly used for accessing routing related props injected by react-router.
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

//Once we add maoDispatchToProps function in connect, then connect will no longer attach the dispatch
//property on our component. so that we need to put this inside mDTP
function mapDispatchToProps(dispatch){
  return {
    //createCourse: course => dispatch(courseActions.createCourse(course))
    //createCourse: bindActionCreators(courseActions.createCourse, dispatch)
    actions: bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//above connect call is similar to the below code..the first two parameters will return a function
//and we call that resulted function with our class component as parameter

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr'
import {authorsFormattedForDropdown} from "../../selectors/selectors";

//added export keyword; unconnected and can be imported as named compnents(sorrounded by {}) which is useful for testing
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      //ERROR solution: the initial value fro course props upon loading the page is empty and that's what get set to sate
      //state wont get updated later on after ajax request are completed
      //this is where we need to use lifecycle method called (componentWillReceiveProps)
      //which will update our state when props change
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  //this lifecycle method is called when the props get changed or even when the react thinks that props might change
  //this function may run even if sometimes when props haven't changed.
  componentWillReceiveProps(nextProps) {
    if(this.props.course.id != nextProps.course.id) {
      //Necessary to populate from when existing course is loaded directly.
      //updates localstate when props changed
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  //one update function for all fields
  updateCourseState(event){
    let course = Object.assign({},this.state.course);
    const field = event.target.name;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length <5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid=false;
    }

    this.setState({errors:errors});
    return formIsValid;
  }

  saveCourse(event){
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState(({saving:true}));

    //thunks uses promises; so redirect to other page only after complting the current action/task
    //.then(()=>{}) is the promise
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error=>{
        toastr.error(error);
        this.setState(({saving:false}));
      })
  }

  redirect() {
    this.setState(({saving:false}));
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          allAuthors={this.props.authors}
          errors={this.state.errors}
          course={this.state.course}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired
};

//pull in the react router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id){
  const course = courses.filter(course => course.id == id);
  if(course.length) return course[0];//since filter returns an array, have to grab the first.
  return null;
}

//Good place to do data transformations is mSTP function
function mapStateToProps(state, ownProps) {
  //using ownProps we can read the properties of this component from router

  const courseId = ownProps.params.id; //from the path `/course/:id1

  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  //ERROR solution: we are using state.courses.length to wait for the ajax requests to complete
  //so that we can get the courses and then call getCourseBYId; without checking the condition
  //the getCourseById function is called and returns null(because the ajax requests to get all courses)
  //would not be completed by then.
  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

//this is the connected component and unnamed component
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);


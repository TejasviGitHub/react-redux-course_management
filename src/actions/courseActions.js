//contains course related action creators
import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";

//action called createCourse
export function loadCoursesSuccess(courses) {
  //return an action which is an object
  return {type: types.LOAD_COURSE_SUCCESS, courses};
}

//loadCourses thunk
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course}
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course}
}

//saveCourses thunk
export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return CourseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


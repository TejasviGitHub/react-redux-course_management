// import AuthorApi from '../api/mockAuthorApi';
// import * as types from './actionTypes';
//
// export function loadAuthorSuccess (authors) {
//   return {types: types.LOAD_AUTHORS_SUCCESS, authors};
// }
//
// //redux-thunk - it return a function(return dispatch twice)
// export function loadAuthors() {
//   return dispatch => {
//     return AuthorApi.getAllAuthors().then(authors => {
//       dispatch(loadAuthorSuccess(authors));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }


//contains course related action creators

import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from "./ajaxStatusActions";

//action called createCourse
export function loadAuthorsSuccess(authors) {
  //return an action which is an object
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

//always call a function with (). For example: below for the getAllAuthors; if you just call
//AuthorApi.getAllAuthors, then error will pop up; instead you should call it as
//AuthorApi.getAllAuthors()
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall()); //dispatching beginajaxcall action on every thunk

    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

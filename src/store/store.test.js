//integration test

import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../actions/courseActions'; //eslint-disable-line import/default
import * as courseActions from '../actions/courseActions';

describe('store', function () {
  it('Should handle creating courses', ()=>{
    //arrange
    const store=createStore(rootReducer,initialState);
    const course = {
      title: "Clean Code"
    };

    //act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    //asert
    const actual = store.getState().courses[0];
    const expected = {
      title:"Clean Code"
    };

    expect(actual).toEqual(expected);
  });
})

import expect from 'expect';
import * as courseActions from './courseActions';
import * as types from './actionTypes';

//testing thunks
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

//Test a sync action
describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      //arange
      const course = {id:'clean-code', title: 'Clean Code'};
      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      //act
      const action = courseActions.createCourseSuccess(course);

      //asert
      expect(action).toEqual(expectedAction);
    })
  });
});

//configuring mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  //imp to call cleanAll, it performs cleanup after each one of our tests is run
  afterEach(() => {
    nock.cleanAll();
  });

  //note: we pass a callback function called done to Mocha. Call this function when async work is complete.
  it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loadinf courses', (done) => {
    ///here's an example call to nock
    //nock('http://example.com/')
    //  .get('/courses')
    //  .reply(200,{body:{course:[{id:1,firstName:'Cory',lastName:'House'}] }});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSE_SUCCESS, body: {courses:[{id:'clean-code', title:'Clean Code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(()=> {
      const actions=store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSE_SUCCESS);
      done(); //call-back to say that we r done.
    })
  });
});

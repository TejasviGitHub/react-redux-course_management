import expect from 'expect'; //assertion library
import React from 'react';
import {ManageCoursePage} from './ManageCoursePage'; //importing named component(sourrounded by {})/unconnected component
// import ManageCoursePage from './ManageCoursePage'; `this import gives the default export component`
import {mount, shallow} from 'enzyme';


describe('Manage Course Page', ()=> {
  it('sets error message when trying to save empty title or length less than 5 characters', ()=> {
    // ERROR: `const wrapper = mount(<ManageCoursePage/>);`
    // you will get error because it is not wrapped inside provider

    // APPROACH 1: const wrapper = mount(<Provider store={store}><ManageCoursePage/></Provider>);
    //above approach is useful to test usually `mapStateToProps`

    const props = {
      authors: [],
      actions: {saveCourse:()=>{return Promise.resolve();}}, //mDTP has actions property, saveCOurse uses the actions property to dispatch the action; so we
      //create a actions property with the saveCourse function and resolving the promise
      course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    };

    //return shallow(<CourseForm {...props} />);
    //shallow is called shallow because it renders one layer deep.
    //Here we need to test this components interactions with its child components.
    //More specifically, CourseFOrm component. so, we need to use mount so that a full
    //DOM is created in Enzyme is using jsdom to create a virtual in-memory DOM.

    const wrapper = mount(<ManageCoursePage {...props} />);
    const saveButton = wrapper.find('input').last(); //submit input is the last input selector; so we are
    //finding the last input tag using the .last selector; we can also use findElementById/Class if available

    expect(saveButton.prop('type')).toBe('submit');

    //we can simulate any events in React such as click, change etc.
    //here we will simulate click event.
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');

  });
});

import expect from 'expect'; //assertion library
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';
import {mount, shallow} from 'enzyme';

function setup(saving) {
  let props = {
    course: {}, saving:saving, errors: {},
    onSave: ()=>{},
    onChange: ()=>{}
  };

  return shallow(<CourseForm {...props} />);
  //shallow is called shallow because it renders one layer deep.
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);

    //expected to find the form with length 1 means expecting only one form element
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "save" when not saving', () => {
    const wrapper = setup(false);

    //we want to find the input, look at the props and get the value out of the
    // props and expected it tobe 'Save'
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "saving..." when saving', () => {
    const wrapper = setup(true);

    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});

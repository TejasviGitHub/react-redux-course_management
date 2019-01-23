import expect from 'expect'; //asertion library
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

//setup function will return us the output of the component under test
function setup(saving) {
  let props = {
    course: {}, saving:saving, errors: {},
    onSave: ()=>{},
    onChange: ()=>{}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return{
    props,
    output,
    renderer
  };
}

//describe is used to group and label your test; you can also nest multiple test inside
describe('CourseForm via React Test Utils', () => {
  //it allows to describe what we are trying to test
  it('renders form and h1', () => {
    const { output } = setup();
    expect(output.type).toBe('form'); //expecting the top-level element to be form
    // (in CourseForm Component)

    //getting reference to child elements with `output.props.children`
    let [ h1 ] = output.props.children;
    expect(h1.type).toBe('h1');
    //destructing the array that is returned from children and getting the first
    // element with name `h1`
  });

  it('save button is labeled "save" when not saving', () => {
    const {output} = setup(false);
    const submitButton = output.props.children[5]; //getting the fifth child which
    // is the index of submit button
    expect(submitButton.props.value).toBe('Save');
  });

  it('save button is labeled "saving..." when saving', () => {
    const {output} = setup(true);
    const submitButton = output.props.children[5]; //getting the fifth child which
    // is the index of submit button
    expect(submitButton.props.value).toBe('Saving...');
  });
});

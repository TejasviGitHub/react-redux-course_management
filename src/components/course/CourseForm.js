//state less component
import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

//Instead of props as inputs , we are using destructed props
const CourseForm = ({saving, course, allAuthors, onSave, onChange, errors}) => {
  return(
      <form>
        <h1>Manage Course</h1>
        <TextInput
          name="title"
          label="Title"
          value={course.title}
          onChange={onChange}
          error={errors.title}
        />

        <SelectInput
          name="authorId"
          label="Author"
          defaultOption="Select Author"
          options={allAuthors}
          value={course.authorId}
          onChange={onChange}
          error={errors.authorId}
        />

        <TextInput
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}
        />

        <TextInput
        name="Length"
        label="Length"
        value={course.length}
        onChange={onChange}
        error={errors.length}
        />

        <input
          type="submit"
          disabled={saving}
          value={saving ? "Saving..." : "Save"}
          className="btn btn-primary"
          onClick={onSave}
        />
      </form>
  );
};



CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object,
  saving: React.PropTypes.bool.isRequired
};

export default CourseForm;

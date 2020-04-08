import React, { useState, useEffect } from "react";
// import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
// import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseAction";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //from the path '/courses/:slug'
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChageListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  const handleChange = ({ target }) => {
    const updatedCourse = { ...course, [target.name]: target.value };
    setCourse(updatedCourse);
  };

  const formIsValid = () => {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "AuthorId is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is valid if the error object has no properties
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Added!");
    });
  };
  return (
    <>
      <h2>Manage Course </h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;

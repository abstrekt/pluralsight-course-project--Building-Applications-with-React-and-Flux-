import React, { useState } from "react";
// import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = props => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  const handleChange = ({ target }) => {
    const updatedCourse = { ...course, [target.name]: target.value };
    setCourse(updatedCourse);
  };

  const handleSubmit = e => {
    e.preventDefault();
    courseApi.saveCourse(course);
  };
  return (
    <>
      <h2>Manage Course </h2>
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;

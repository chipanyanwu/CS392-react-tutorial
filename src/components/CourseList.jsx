import React from "react"

function CourseList({ courses }) {
  return (
    <div>
      {Object.entries(courses).map(([key, course]) => (
        <p key={key}>
          {course.term} CS {course.number}: {course.title}
        </p>
      ))}
    </div>
  )
}

export default CourseList

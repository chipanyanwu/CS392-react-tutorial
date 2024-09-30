import "./CourseList.css"

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-card-header">
        <h2>
          {course.term} CS {course.number}
        </h2>
        <p>{course.title}</p>
      </div>
      <div className="course-card-footer">
        <p>{course.meets}</p>
      </div>
    </div>
  )
}

function CourseList({ courses }) {
  return (
    <div className="course-list">
      {Object.entries(courses).map(([key, courseInfo]) => (
        <CourseCard key={key} course={courseInfo} />
      ))}
    </div>
  )
}

export default CourseList

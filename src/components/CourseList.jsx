import "./CourseList.css"

function CourseCard({ id, course, selected, toggleSelected }) {
  return (
    <div
      className={`course-card ${selected.includes(id) ? "selected" : ""}`}
      onClick={() => toggleSelected(id)}
    >
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

function CourseList({ courses, termFilter, selected, toggleSelected }) {
  return (
    <div className="course-list">
      {Object.entries(courses)
        .filter(([key, courseInfo]) => courseInfo.term == termFilter)
        .map(([key, courseInfo]) => (
          <CourseCard
            key={key}
            id={key}
            course={courseInfo}
            selected={selected}
            toggleSelected={toggleSelected}
          />
        ))}
    </div>
  )
}

export default CourseList

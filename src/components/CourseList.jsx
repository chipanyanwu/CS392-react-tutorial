import { Link } from "react-router-dom"
import "./CourseList.css"

function CourseCard({ id, course, selected, toggleSelected, selectable }) {
  return (
    <div
      className={`course-card ${selected.includes(id) ? "selected" : ""} ${
        selectable ? "selectable" : "unselectable"
      }`}
    >
      <div className="course-card-btn-container">
        <Link to={`/edit/${id}`}>
          <button className="course-card-btn">
            <i className="bi bi-pencil-square"></i>
          </button>
        </Link>
      </div>
      <div
        className="course-card-body"
        onClick={() => {
          if (selectable) {
            toggleSelected(id)
          }
        }}
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
    </div>
  )
}

function CourseList({
  courses,
  termFilter,
  selected,
  toggleSelected,
  unselectable,
}) {
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
            selectable={!(key in unselectable)}
          />
        ))}
    </div>
  )
}

export default CourseList

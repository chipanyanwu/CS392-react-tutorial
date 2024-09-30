import { useState, useEffect } from "react"
import { getConflictingCourses } from "../utilities/timeConflicts"
import CourseList from "./CourseList"
import Modal from "./Modal"
import "./TermPage.css"

const terms = ["Fall", "Winter", "Spring"]

const TermButton = ({ term, selection, setSelection }) => {
  return (
    <div>
      <input
        type="radio"
        id={term}
        className="btn-check"
        checked={term === selection}
        autoComplete="off"
        onChange={() => setSelection(term)}
      />
      <label className="btn btn-outline-dark p-2" htmlFor={term}>
        {term}
      </label>
    </div>
  )
}

const TermSelector = ({ selection, setSelection }) => {
  return (
    <div className="btn-group">
      {terms.map((term) => (
        <TermButton
          key={term}
          term={term}
          selection={selection}
          setSelection={setSelection}
        />
      ))}
    </div>
  )
}

function TermPage({ courses }) {
  const [termSelection, setTermSelection] = useState(terms[0])
  const [selected, setSelected] = useState([])
  const [conflicting, setConflicting] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const toggleSelected = (item) => {
    setSelected(
      selected.includes(item)
        ? selected.filter((x) => x !== item)
        : [...selected, item]
    )
  }

  useEffect(() => {
    setConflicting(getConflictingCourses(selected, courses))
  }, [selected])

  useEffect(() => console.log(conflicting), [conflicting])

  return (
    <>
      <div className="term-page-header">
        <TermSelector
          selection={termSelection}
          setSelection={setTermSelection}
        />
        <button className="btn btn-dark" onClick={() => setModalOpen(true)}>
          Course Plan
        </button>
      </div>
      <Modal
        open={modalOpen}
        close={() => setModalOpen(false)}
        headerTitle={"Course Plan"}
      >
        {selected.length > 0 ? (
          Object.entries(courses)
            .filter(([key, course]) => selected.includes(key))
            .map(([key, course]) => (
              <p key={key}>
                {course.term} CS {course.number}: {course.title} ({course.meets}
                )
              </p>
            ))
        ) : (
          <p>
            No classes currently selected. Please click on the classes that you
            would like to add to your schedule.
          </p>
        )}
      </Modal>
      <CourseList
        courses={courses}
        termFilter={termSelection}
        selected={selected}
        toggleSelected={toggleSelected}
        unselectable={conflicting}
      />
    </>
  )
}

export default TermPage

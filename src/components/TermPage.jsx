import { useState } from "react"
import CourseList from "./CourseList"
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
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
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
  const [selection, setSelection] = useState(terms[0])

  return (
    <>
      <TermSelector selection={selection} setSelection={setSelection} />
      <CourseList courses={courses} termFilter={selection} />
    </>
  )
}

export default TermPage

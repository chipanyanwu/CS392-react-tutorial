import { useNavigate } from "react-router-dom"
import { useFormData } from "../utilities/useFormData"
import { useAuthState, useDbUpdate } from "../utilities/firebase"

const validateCourseData = (key, val) => {
  switch (key) {
    case "title":
      return /^.{2,}$/.test(val) ? "" : "must be least two characters"
    case "meets":
      return /^(M|Tu|W|Th|F|Sa|Su)+( (?:[01]?\d|2[0-3]):[0-5]\d-(?:[01]?\d|2[0-3]):[0-5]\d)$/.test(
        val
      )
        ? ""
        : "must contain days and start-end, e.g., MWF 12:00-13:20"
    default:
      return ""
  }
}

const InputField = ({ name, text, state, change, disabled }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={state.values?.[name]}
      onChange={change}
      disabled={disabled ? "disabled" : ""}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
)

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate()
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  )
}

const CourseEditor = ({ course }) => {
  const [user] = useAuthState()

  const navigate = useNavigate()
  const [update, result] = useDbUpdate(
    `/courses/${course.term[0] + course.number}`
  )
  const [state, change] = useFormData(validateCourseData, course)

  const getDifferences = (referenceObj, obj) => {
    let differences = {}

    Object.keys(obj).forEach((key) => {
      if (referenceObj[key] !== obj[key]) {
        differences[key] = obj[key]
      }
    })

    return differences
  }

  const submit = (evt) => {
    evt.preventDefault()

    let diff = getDifferences(course, state.values)
    if (user != undefined && Object.keys(diff).length > 0) {
      update(state.values)
    }

    navigate("/")
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField
        name="title"
        text="Title"
        state={state}
        change={change}
        disabled={user == undefined}
      />
      <InputField
        name="meets"
        text="Meeting Times"
        state={state}
        change={change}
        disabled={user == undefined}
      />
      <ButtonBar disabled={user == undefined} />
    </form>
  )
}

export default CourseEditor

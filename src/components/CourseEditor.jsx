import { useNavigate } from "react-router-dom"
import { useFormData } from "../utilities/useFormData"

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

const InputField = ({ name, text, state, change }) => (
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
  // const [update, result] = useDbUpdate(`/users/${user.id}`)
  const [state, change] = useFormData(validateCourseData, course)

  const submit = (evt) => {
    evt.preventDefault()
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <InputField name="title" text="Title" state={state} change={change} />
      <InputField
        name="meets"
        text="Meeting Times"
        state={state}
        change={change}
      />
      <ButtonBar disabled={true} />
    </form>
  )
}

export default CourseEditor

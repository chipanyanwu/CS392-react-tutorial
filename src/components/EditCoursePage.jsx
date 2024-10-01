import { useParams } from "react-router-dom"
import CourseEditor from "./CourseEditor"

function EditCoursePage({ courses }) {
  let { courseId } = useParams()

  return (
    <>
      <CourseEditor course={courses[courseId]} />
    </>
  )
}

export default EditCoursePage

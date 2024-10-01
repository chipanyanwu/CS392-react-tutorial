import Modal from "./Modal"

export default function CoursePlanModal({
  courses,
  selected,
  modalOpen,
  setModalOpen,
}) {
  return (
    <Modal
      open={modalOpen}
      close={() => setModalOpen(false)}
      headerTitle={"Course Plan"}
    >
      {selected.length > 0 ? (
        Object.entries(courses)
          .filter(([key, _]) => selected.includes(key))
          .map(([key, course]) => (
            <p key={key}>
              {course.term} CS {course.number}: {course.title} ({course.meets})
            </p>
          ))
      ) : (
        <p>
          No classes currently selected. Please click on the classes that you
          would like to add to your schedule.
        </p>
      )}
    </Modal>
  )
}

// getCoursesById and excludeCoursesById can be combined for more efficiency
const getCoursesById = (courseIds, courses) => {
  return Object.entries(courses).filter(([key, _]) => courseIds.includes(key))
}

const excludeCoursesById = (courseIds, courses) => {
  return Object.entries(courses).filter(([key, _]) => !courseIds.includes(key))
}

const getCourseTimes = (courses) => {
  return Object.entries(courses).map(([key, course]) => [
    course[1].term,
    ...course[1].meets.split(" "),
  ])
}

const doTermsConflict = (term1, term2) => {
  return term1 == term2
}

const doDaysConflict = (days1, days2) => {
  return days1.search(days2) != -1 || days2.search(days1) != -1
}

const doTimesConflict = (time1, time2) => {
  // Helper function to convert "HH:MM" to minutes since midnight
  function toMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  // Split the time ranges into start and end times
  const [start1, end1] = time1.split("-")
  const [start2, end2] = time2.split("-")

  // Convert start and end times to minutes
  const start1Minutes = toMinutes(start1)
  const end1Minutes = toMinutes(end1)
  const start2Minutes = toMinutes(start2)
  const end2Minutes = toMinutes(end2)

  // Check for conflict
  return !(end1Minutes <= start2Minutes || end2Minutes <= start1Minutes)
}

export const getConflictingCourses = (courseIds, courses) => {
  let selectedCourses = getCoursesById(courseIds, courses)
  let otherCourses = excludeCoursesById(courseIds, courses)

  let selectedCourseTimes = getCourseTimes(selectedCourses)

  return Object.fromEntries(
    otherCourses.filter(([key, course]) => {
      let [days, time] = course.meets.split(" ")
      for (const meets of selectedCourseTimes) {
        if (
          doTermsConflict(course.term, meets[0]) &&
          doDaysConflict(days, meets[1]) &&
          doTimesConflict(time, meets[2])
        ) {
          return true
        }
      }

      return false
    })
  )
}

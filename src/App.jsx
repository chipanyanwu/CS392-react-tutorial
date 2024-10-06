import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDbData, useProfile } from "./utilities/firebase"
import Banner from "./components/Banner"
import TermPage from "./components/TermPage"
import EditCoursePage from "./components/EditCoursePage"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./App.css"

const Main = () => {
  const [schedule, error] = useDbData("/")

  if (error) return <h1>Error loading user data: {`${error}`}</h1>
  if (schedule === undefined) return <h1>Loading data...</h1>
  if (!schedule) return <h1>No data found</h1>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner title={schedule.title} />
              <TermPage courses={schedule.courses} />
            </>
          }
        />
        <Route
          path="edit/:courseId"
          element={
            <>
              <Banner title={schedule.title} />
              <EditCoursePage courses={schedule.courses} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App

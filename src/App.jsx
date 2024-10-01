import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useJsonQuery } from "./utilities/fetch"
import Banner from "./components/Banner"
import TermPage from "./components/TermPage"
import EditCoursePage from "./components/EditCoursePage"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./App.css"

const Main = () => {
  const coursesURL =
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  const [schedule, isLoading, error] = useJsonQuery(coursesURL)

  if (error) return <h1>Error loading user data: {`${error}`}</h1>
  if (isLoading) return <h1>Loading user data...</h1>
  if (!schedule) return <h1>No user data found</h1>

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

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Main />
      </div>
    </QueryClientProvider>
  )
}

export default App

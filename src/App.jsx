import Banner from "./components/Banner"
import TermPage from "./components/TermPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useJsonQuery } from "./utilities/fetch"
// import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

const Main = () => {
  const coursesURL =
    "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php"
  const [schedule, isLoading, error] = useJsonQuery(coursesURL)

  if (error) return <h1>Error loading user data: {`${error}`}</h1>
  if (isLoading) return <h1>Loading user data...</h1>
  if (!schedule) return <h1>No user data found</h1>

  return (
    <>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </>
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

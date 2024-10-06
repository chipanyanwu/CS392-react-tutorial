import { useCallback, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, onValue, ref, update } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFq3RS8n0EbeYoXVP27nCdFA-Fd1L4xZg",
  authDomain: "cs392-react-tutorial-8e44d.firebaseapp.com",
  databaseURL: "https://cs392-react-tutorial-8e44d-default-rtdb.firebaseio.com",
  projectId: "cs392-react-tutorial-8e44d",
  storageBucket: "cs392-react-tutorial-8e44d.appspot.com",
  messagingSenderId: "503538292481",
  appId: "1:503538292481:web:fdc664a3077a8cc978ed00",
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const database = getDatabase(firebase)

export const useDbData = (path) => {
  const [data, setData] = useState()
  const [error, setError] = useState(null)

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val())
        },
        (error) => {
          setError(error)
        }
      ),
    [path]
  )

  return [data, error]
}

const makeResult = (error) => {
  const timestamp = Date.now()
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`
  return { timestamp, error, message }
}

export const useDbUpdate = (path) => {
  const [result, setResult] = useState()
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)))
    },
    [database, path]
  )

  return [updateData, result]
}

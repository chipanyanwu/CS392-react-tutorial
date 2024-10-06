import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase"
import { Link } from "react-router-dom"

const SignInButton = () => (
  <button className="ms-auto btn btn-primary" onClick={signInWithGoogle}>
    Sign in
  </button>
)

const SignOutButton = () => (
  <button className="ms-auto btn btn-outline-primary" onClick={signOut}>
    Sign out
  </button>
)

const AuthButton = () => {
  const [user] = useAuthState()
  return user ? <SignOutButton /> : <SignInButton />
}

function Banner({ title }) {
  return (
    <div
      style={{ marginBottom: "3rem", display: "flex", alignItems: "center" }}
    >
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <h1>{title}</h1>
      </Link>
      <AuthButton />
    </div>
  )
}

export default Banner

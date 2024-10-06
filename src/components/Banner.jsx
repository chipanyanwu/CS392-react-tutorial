import { signInWithGoogle, signOut, useProfile } from "../utilities/firebase"
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

const AuthButton = ({ user }) => {
  return user ? <SignOutButton /> : <SignInButton />
}

function Banner({ title }) {
  const [{ user, isAdmin }, isLoading, error] = useProfile()

  return (
    <div
      style={{
        marginBottom: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <h1>{title}</h1>
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAdmin ? (
          <i
            className="bi bi-person-fill-gear h2"
            style={{ marginRight: "1rem", marginBottom: "0" }}
          ></i>
        ) : (
          <></>
        )}
        <AuthButton user={user} />
      </div>
    </div>
  )
}

export default Banner

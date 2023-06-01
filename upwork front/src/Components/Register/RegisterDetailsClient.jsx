// dependencies
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
// files
import { UserContext } from "../../Context";
//styles
const stylesHeader = {
  fontSize: `var(--body-font-size)`,
  color: `rgba(var(--accent-color))`,
  textDecoration: `none`
}
const stylesBtn = {
  display: "block",
  width: "60%",
  color: "rgba(var(--accent-color))",
  background: "white",
  borderRadius: "20px",
  padding: "0.5em 0",
  marginTop: "1em",
  marginLeft: "auto",
  marginRight: "auto",
}
// variables
const stylesDisabled = {
  background: "gray",
  cursor: "not-allowed"
}
const RegisterDetailsClient = () => {
  const { setUser } = useContext(UserContext);
  const [status, setStatus] = useState(0);
  const [client, setClient] = useState({
    firstname: "",
    lastname: "",
    email: "",
    passsword: "",
    role: "client",
    country: ""
  });
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false)
  function handleChange(e) {
    setClient((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  async function registerClient(e) {
    e.preventDefault();
    setLoading(stylesDisabled)
    setDisabled(true)
    await axios.post("/register/client", { client }).then((res) => {
      setLoading({})
      setDisabled(false)
      setUser(res.data);
      setStatus(200);
    }).catch((e) => {
      console.log(e)
      setLoading({})
      setDisabled(false)
    })
  }

  if (status === 200) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <header id="login-register-header" className="freelancer_or_hirer_header">
        <p><Link to={"/about"} style={{ textDecoration: "none", color: `rgba(var(--accent-color))` }}><span>up</span>works</Link></p>
        <Link to={"/login"} style={stylesHeader}>Log in</Link>
      </header>

      <section id="login-register-card">
        <header>
          <h1>Sign up to find top talent</h1>
        </header>

        <main>
          <form>
            <input type="text" placeholder="first name" name="firstname" value={client.firstname} onChange={handleChange} required />
            <input type="text" placeholder="last name" name="lastname" value={client.lastname} onChange={handleChange} required />
            <input type="email" placeholder="email" name="email" value={client.email} onChange={handleChange} required />
            <input type="password" placeholder="password" name="password" value={client.password} onChange={handleChange} required />
            <label htmlFor={"password"} style={{ display: "block", marginBottom: "1em" }}>Password must be at least eight characters</label>
            <input type="text" placeholder="country" name="country" value={client.country} onChange={handleChange} required />
          </form>
          <button onClick={registerClient} disabled = {disabled} style = {loading}>Create Account</button>
        </main>

        <footer>
          <p>Here to find work?</p>
          <Link to={"/register"} style={stylesBtn}>Join as a freelancer</Link>
        </footer>

      </section>
    </>
  )
}
export default RegisterDetailsClient;
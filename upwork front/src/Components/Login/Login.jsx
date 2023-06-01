// dependencies imports
import {Link, Navigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from "axios";
// files
import HeaderBeforeLogin from "../Headers/HeaderBeforeLogin";
import {UserContext} from "../../Context";
// variables
const stylesDisabled = {
  background: "gray",
  cursor: "not-allowed"
} 
const styles = {
  display: "block",
  width: "60%",
	color: "rgba(var(--accent-color))",
	background: "white",
  borderRadius: "20px",
	padding: "0.5em 0",
	marginTop: "1em",
  textDecoration: "none",
  marginLeft: "auto",
  marginRight: "auto",
  outline: "2px solid rgba(var(--border-color))"
}
const Login = () => {
  const {setUser} = useContext(UserContext);
  const [status, setStatus] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(null);
  function handleChange(e) {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  async function loginUser(e) {
    e.preventDefault();
    setLoading(stylesDisabled)
    setDisabled(true)
    await axios.post("/login", { credentials }).then((res) => {
      setLoading({})
      setDisabled(false)
      setUser(res.data);
      setStatus(true);
    }).catch((e) => {
      console.log(e)
      setError(true);
      setLoading({})
      setDisabled(false)
      setTimeout(() => {
        setError(false)          
      }, 3000)
    })
  }
  
  if (status === true) {
    return <Navigate to="/dashboard" />
  }
  return (
    <>
    <HeaderBeforeLogin />
    <main id = "login-container">
    	<section id = "login-register-card">
    			<header>
          {error && <h4 style = {{color: "red"}}>Email or password is invalid. Please try again</h4>}
    				<h1>Log in to Upwork</h1>
    			</header>
    			<main>
    				<div>
    				  <input type = "email" placeholder = "Type your email" name = "email" value = {credentials.email} onChange = {handleChange} />
              <input type = "password" placeholder = "Type your password" name = "password" value = {credentials.password} onChange = {handleChange} />
    				</div>
    				<button onClick = {loginUser} style = {loading} disabled = {disabled}>Continue with Email</button>
    			</main>
        
    			<footer>
    				<p>Don't have an upwork account</p>
    			<Link to = {"/register"} style = {styles} className = "footer-btn">Sign Up</Link>
    			</footer>
        
    	</section>
    	
    	<footer id = "login-register-footer">
    	  <p><span>&copy</span> 2015 - 2023 Upworks® Global Inc. • Privacy Policy</p>
    	</footer>
    </main>
    </>
  )
}
export default Login;
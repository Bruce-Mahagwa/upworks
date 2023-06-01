// dependencies imports
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";
// files
import HeaderBeforeLogin from "../Headers/HeaderBeforeLogin";
// Link styles
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
const Register = () => {
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);
  function setUserRole() {
    if (role) {
      setReady(true);
    }
    else {
      console.log("please input role")
    }
  }
  if (ready && role === "freelancer") {
    return <Navigate to = "/register/freelancer" />
  }
  if (ready && role === "client") {
    return <Navigate to = "/register/client" />
  }
  return (
    <>
    <HeaderBeforeLogin />
      
	 <section id = "login-register-card">
		<header>
			<h1>Join as a client or freelancer</h1>
		</header>
		
		<main>
			<article>
				<div className = "freelancer-hirer">
				    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
</svg>
			<input 
        type = "radio" 
        value = "client" 
        name = "role"
        onChange = {(e) => setRole(e.target.value)}
        checked = {role === "client"}
        />			 
 </div>
		<p>I am a client hiring for a project</p>
</article>

<article>
			<div className = "freelancer-hirer">
				     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
</svg>

				<input 
          type = "radio" 
          value = "freelancer" 
          name = "role" 
          checked = {role === "freelancer"}
          onChange = {(e) => setRole(e.target.value)}
        />
				</div>
			<p>I am a freelancer looking for work</p>
			</article>
			<button onClick = {setUserRole}>Create Account</button>
		</main>
     
		<footer>
			<p>Already have an account</p>
		    <Link to = {"/login"} style={styles} className = "footer-btn">Log in</Link>
		</footer>
	</section>
  </>
  )
}
export default Register;
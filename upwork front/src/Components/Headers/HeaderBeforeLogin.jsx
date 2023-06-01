// dependencies
import {Link} from "react-router-dom";

const HeaderBeforeLogin = () => {
  return (
    <header id = "login-register-header">
    	<p><Link to = {"/about"} style = {{textDecoration: "none", color: `rgba(var(--accent-color))`}}><span>up</span>works</Link></p>
    </header>
  )
}
export default HeaderBeforeLogin;
// dependencies
import { Link, Navigate } from "react-router-dom";
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import { useContext, useState } from "react";
// files
import { UserContext } from "../../Context";

const ClientLargeScreenNav = () => { 
  const { user, ready, setUser } = useContext(UserContext);
  // logout
  const [toLogout, setToLogout] = useState(null);
  console.log(toLogout, ready)
  async function logout() {
    await axios.post("/logout").then((res) => {
      setUser(null);
      setToLogout("/")  
    }).catch((e) => {
      console.log(e)
    })
  }
  if (toLogout !== null) {
    return <Navigate to={"/login"} />
  }
  if (ready && user === null && toLogout === null) {
    return <Navigate to={"/login"} />
  }
  console.log(toLogout, ready)
  return (
    <header id="universal_header_large">
      <nav id="large_screen_nav">
        <p><Link to={"/dashboard"} style={{ textDecoration: "none", color: `rgba(var(--accent-color))` }}><span>up</span>works</Link></p>

        <div className="nav_item_large_container">
          <div>
            <button className="btn_edit_profile_1">Post job</button>
          </div>
          <ul>
            <li><Link to={"/dashboard/postjob"} style={{ textDecoration: "none" }}>Post Jobs</Link></li>
            <li><Link to={"/dashboard/soon"} style={{ textDecoration: "none" }}>Find Freelancers</Link></li>
          </ul>
        </div>

        <div className="nav_item_large_container">
          <div>
            <Link to={"/dashboard/soon"} className="btn_edit_profile_1" style={{ textDecoration: "none" }}>Messages</Link>
          </div>
        </div>

        <div className="nav_item_large_container nav_item_large_container-search_bar">
          <div>
            <input type="text" name="search" placeholder="Search" />
          </div>
          <div>
            <select name="search_value">
              <option value="jobs">Jobs</option>
              <option value="talent">Talent</option>
            </select>
          </div>
          <div>
            <Link to={"/dashboard/soon"}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg></Link>
          </div>
        </div>

        <div className="nav_item_large_container">
          <div className="special_svg">
            <Link to={"/dashboard/help"}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg></Link>
          </div>
        </div>

        <div className="nav_item_large_container">
          <div style = {{display: "flex"}}>
            <Link to={"/dashboard/soon"}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg></Link>
            <span style = {{display: "block"}}>{user?.firstname}</span>
          </div>
            <ul>
              <li><button onClick={logout} className = "btn_edit_profile_1">Logout</button></li>
            </ul>
        </div>
      </nav>
    </header>
  )
}
export default ClientLargeScreenNav;
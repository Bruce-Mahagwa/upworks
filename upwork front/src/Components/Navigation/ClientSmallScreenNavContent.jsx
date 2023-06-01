// dependencies
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
// files
import { UserContext } from "../../Context";
const ClientSmallScreenNavContent = () => {
  const { user, ready, setUser } = useContext(UserContext);
  // logout
  const [toLogout, setToLogout] = useState(null);
  async function logout() {
    await axios.post("/logout").then((res) => {
      setUser(null);
      setToLogout("/")  
    }).catch((e) => {
      console.log(e)
    })
  }
  if (toLogout) {
    return <Navigate to={"/login"} />
  }
  if (ready && user === null && toLogout === null) {
    return <Navigate to={"/login"} />
  }
  
  return (
    <nav id="small_screen_nav">
      <div className="nav_item_small_container">
        <Link to={"/dashboard"}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg></Link>
        <div>
          <h2>{user?.firstname} {user?.lastname}</h2>
          <p>{user?.role}</p>
        </div>
      </div>

      <div className="border"></div>

      <div className="nav_item_small_container">
        <div>
          <button className="btn_edit_profile_1">Post job</button>
          <ul>
            <li><Link to={"/dashboard/postjob"} style={{ textDecoration: "none", color: "rgba(var(--accent_color))" }}>Post Jobs</Link></li>
            <li><Link to={"/dashboard/soon"} style={{ textDecoration: "none", color: "rgba(var(--accent_color))" }}>Freelancers</Link></li>
          </ul>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </div>

      <div className="border"></div>

      <div className="nav_item_small_container">
        <div>
          <Link to={"/dashboard/soon"} className="btn_edit_profile_1" style={{ textDecoration: "none", color: "rgba(var(--accent_color))" }}>Messages</Link>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      </div>

      <div className="border"></div>

    <div className="nav_item_small_container">
        <div>
          <Link to={"/dashboard/soon"} className="btn_edit_profile_1" style={{ textDecoration: "none", color: "rgba(var(--accent_color))" }}>Search</Link>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>
        </div>
      </div>

      <div className="border"></div>
      
      <div className="nav_item_small_container">
        <div>
          <Link to={"/dashboard/help"} className="btn_edit_profile_1" style={{ textDecoration: "none", color: "rgba(var(--accent_color))" }}>Help</Link>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
      </div>

      <div className="border"></div>

      <div className="nav_item_small_container">
        <div>
          <button className="btn_edit_profile_1" onClick={logout}>Logout</button>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </div>
      </div>
      <div className = "border"></div>
    </nav>
  )
}
export default ClientSmallScreenNavContent;
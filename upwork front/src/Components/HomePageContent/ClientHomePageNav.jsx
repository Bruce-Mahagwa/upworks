// dependencies
import {Navigate} from "react-router-dom";
import {useState} from "react";

const ClientHomePageNav = () => {
  const [changePage, setChangePage] = useState("");
  function handleClick(e) {
    const page = e.target.getAttribute("data-name");
    setChangePage(page);
  }
  if (changePage) {
    return <Navigate to = {`/dashboard/${changePage}`} />
  }
  return (
     <nav id="home_page_content_nav">
      <div data-name = "soon" onClick = {handleClick}>
        <button>Freelancer Proposals</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <div className="border"></div>

      <div data-name = "soon" onClick = {handleClick}>
        <button>My Projects</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>

      </div>
    </nav>
  )
}
export default ClientHomePageNav;
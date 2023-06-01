//dependencies
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
// files
import SmallScreenNavContent from "./SmallScreenNavContent";
import ClientSmallScreenNavContent from "./ClientSmallScreenNavContent";
import { UserContext } from "../../Context";
const SmallScreenNav = () => {
  const { user } = useContext(UserContext);
  const [isOpenNav, setIsOpenNav] = useState(false);
  function toggleNav() {
    setIsOpenNav((prev) => !prev);
  }
  return (
    <>
      <header className="universal_header_small">
        {!isOpenNav && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={toggleNav}>
          <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>}
        {isOpenNav && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick = {toggleNav}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
}
        <p><Link to={"/dashboard"} style={{ textDecoration: "none", color: `rgba(var(--accent-color))` }}><span>up</span>works</Link></p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
        </svg>
      </header>
      {isOpenNav && (user?.role === "freelancer" ? <SmallScreenNavContent /> : <ClientSmallScreenNavContent />)}
    </>
  )
}
export default SmallScreenNav;
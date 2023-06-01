// file imports
import ClientHomePageNav from "../../Components/HomePageContent/ClientHomePageNav";
import HomePageNav from "../../Components/HomePageContent/HomePageNav"
import { UserContext } from "../../Context"
//dependencies
import { useContext } from "react";

const HomePageNavigation = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user?.role === "freelancer" && <HomePageNav />}
      {user?.role === "client" && <ClientHomePageNav />}
    </>
  )
}
export default HomePageNavigation;
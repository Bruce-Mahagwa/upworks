// files
import HomePageNavigation from "./HomePageNav";
import ClientHomeContent from "../../Components/HomePageContent/ClientHomeContent";
import HomeContent from "../../Components/HomePageContent/HomeContent";
import { UserContext } from "../../Context";
//dependencies
import { useContext } from "react";
const HomePageContent = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <HomePageNavigation />
      {user?.role === "freelancer" && <HomeContent />}
      {user?.role === "client" && <ClientHomeContent />}
    </>
  )
}
export default HomePageContent;
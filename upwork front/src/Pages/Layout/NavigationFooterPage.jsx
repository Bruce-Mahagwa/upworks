// files
import Footer from "../../Components/Navigation/Footer";
import LargeScreenNav from "../../Components/Navigation/LargeScreenNav";
import ClientLargeScreenNav from "../../Components/Navigation/ClientLargeScreenNav";
import SmallScreenNav from "../../Components/Navigation/SmallScreenNav";
import SmallScreenNavContent from "../../Components/Navigation/SmallScreenNavContent";
import LoginPage from "../Login/LoginPage";
import { UserContext } from "../../Context";
// dependencies
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
const NavigationFooterPage = () => {
  const { user, ready, loading } = useContext(UserContext);
  // console.log(loading, ready, user)
  if (user === null && ready === true) {
    return <Navigate to={"/login"} />
  }

  return (
    <main id="main_layout">
      <SmallScreenNav />
      {user?.role === "freelancer" ? <LargeScreenNav /> : <ClientLargeScreenNav />}
      <Outlet />
      <Footer />
    </main>
  )
}
export default NavigationFooterPage;
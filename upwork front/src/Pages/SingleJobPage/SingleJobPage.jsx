// files
import SingleJob from "../../Components/SingleJob/SingleJob";
import ClientSingleJob from "../../Components/SingleJob/ClientSingleJob";
import {UserContext} from "../../Context";
// dependencies
import {useContext} from "react";
const SingleJobPage = () => {
  const {user} = useContext(UserContext);
  return (
    <>
    {user?.role === "freelancer" ? <SingleJob /> : <ClientSingleJob />}
    </>
  )
}
export default SingleJobPage;
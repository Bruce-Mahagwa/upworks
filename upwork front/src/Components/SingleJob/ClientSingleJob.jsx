// dependencies
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Navigate } from "react-router-dom";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const ClientSingleJob = () => {
  const { clientSingleJob, setClientSingleJob, refresh, setRefresh } = useContext(UserContext);
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams();
  function deleteJob(e) {
    setLoading(styles)
    setDisabled(true)
    axios.delete("/deleteclientjob", { data: { id: id } }).then((res) => {
      setLoading({})
      setDisabled(false)
      setRefresh("deleted");
    }).catch((e) => {
      setLoading({})
      setDisabled(false)
    })
  }
  useEffect(() => {
    axios.get("/singlejob/" + id).then((res) => {
      setClientSingleJob(res.data);
    }).catch((e) => {
      console.log(e);
    });
  }, []);
  if (refresh === "deleted") {
    return <Navigate to={"/dashboard"} />
  }

  return (
    <>
      {!clientSingleJob && <Loading />}
      <main id="single_job_application_page">
        <div className="single_job_application_page_container">
          <header>
            <h2>{clientSingleJob?.title}</h2>
            <p>Posted</p>
          </header>
          <div className="border"></div>
          <main>
            <article>
              <p>{clientSingleJob?.description}</p>
            </article>

            <div className="border"></div>

            <article className="single_job_page_price_experience_level">
              <div>
                <h4>$<span>{clientSingleJob?.price}</span> per hour</h4>
                <p>Fixed Price</p>
              </div>
              <div>
                <h4>{clientSingleJob?.experience}</h4>
                <p>Experience level</p>
              </div>
            </article>

            <div className="border"></div>

            <article>
              <h2>Skills and Expertise</h2>
              <div>
                {clientSingleJob?.skills.map((item) => {
                  return (
                    <button className="skills_btn" disabled={true} key={item}>{item}</button>
                  )
                })}
              </div>
            </article>

            <div className="border"></div>

            <article className="single_job_page_btns_save_apply">
              <button className="btn_edit_profile_2" onClick={deleteJob} style={loading} disabled = {disabled}>Delete</button>
              <Link to={"/dashboard/editjob/" + id} className="btn_edit_profile_1 link" >Edit</Link>
              <Link to={"/dashboard"} className="btn_edit_profile_1 link" >Back</Link>
            </article>
          </main>
        </div>
      </main>
    </>
  )
}
export default ClientSingleJob;
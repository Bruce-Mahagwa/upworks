// dependencies
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
const SingleJob = () => {
  const { singleJob, setSingleJob } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    axios.get("/singlejob/" + id).then((res) => {
      setSingleJob(res.data);
    }).catch((e) => {
      console.log(e);
    })
  }, []);
  return (
    <>
      {!singleJob && <Loading />}
    <main id="single_job_application_page">
      <div className="single_job_application_page_container">
        <header>
          <h2>{singleJob?.title}</h2>
          <p>Posted</p>
        </header>
        <div className="border"></div>
        <main>
          <article>
            <p>{singleJob?.description}</p>
          </article>

          <div className="border"></div>

          <article className="single_job_page_price_experience_level">
            <div>
              <h4>$<span>{singleJob?.price}</span> per hour</h4>
              <p>Fixed Price</p>
            </div>
            <div>
              <h4>{singleJob?.experience}</h4>
              <p>Experience level</p>
            </div>
          </article>

          <div className="border"></div>

          <article>
            <h2>Skills and Expertise</h2>
            <div>
              {singleJob?.skills.map((item) => {
                return (
                  <button className="skills_btn" disabled={true} key={item}>{item}</button>
                )
              })}
            </div>
          </article>

          <div className="border"></div>

          <article className="single_job_page_btns_save_apply">
            <Link to={`/dashboard/proposal/${id}`} className = "btn_edit_profile_2" style = {{textDecoration: "none"}}>Apply</Link>
            <Link to={"/dashboard"} className="btn_edit_profile_1 link" >Back</Link>
          </article>
        </main>
      </div>
    </main>
    </>
  )
}
export default SingleJob;
// dependencies
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// component
const Content = (postedJob) => {
  const { setRefresh } = useContext(UserContext);
  const [id, setId] = useState(null);
  function removeJob(e) {
    const id = e.target.getAttribute("data-name");
    axios.delete("/deleteclientjob", { data: { id: id } }).then((res) => {
      setRefresh(res.data);
    })
  }
  function singlePostedJobPage(e) {
    setId(e.target.getAttribute("data-name"));
  }
  if (id) {
    return <Navigate to={"/dashboard/" + id} />
  }
  return (
    <main>
      <article>
        <h3>{postedJob?.title}</h3>
        <div className="like_unlike_edit_delete_btns">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" data-name={postedJob?._id} onClick={removeJob}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg><small className = "hover_msg">delete</small>
        </div>

        <button className="btn_edit_profile_1" data-name={postedJob?._id} onClick={singlePostedJobPage}>View Job</button>
        <div id="budget_experience_level">
          <div>
            <h4>$<span>{postedJob?.price} </span> per hour</h4>
            <p>Budget</p>
          </div>
          <div>
            <h4>{postedJob?.experience}</h4>
            <p>Experience level</p>
          </div>
        </div>

        <div id="job_description_main_page">
          <p>{postedJob?.description}</p>
        </div>

        <div>
          {postedJob?.skills.map((item) => {
            return (
              <button className="skills_btn" disabled={true} key={item}>{item}</button>
            )
          })}
        </div>
        <div className="border"></div>

      </article>
    </main>
  )
}


const ClientHomeContent = () => {
  const { postedJobs, setRefresh } = useContext(UserContext);
  useEffect(() => {
    setRefresh(true);
  }, [])
  if (!postedJobs) {
    return <Loading />
  }
  return (
    <main id="home_page_content_main">
      <header>
        <h2>Jobs you posted</h2>
        <nav>
          <button className="btn_edit_profile_1">All jobs</button>
          <button className="btn_edit_profile_1">Active jobs</button>
          <button className="btn_edit_profile_1">Pending jobs</button>
        </nav>
        <p>Browse jobs that you have posted</p>
      </header>
      {postedJobs?.map((postedJob, index) => {
        return (
          <Content {...postedJob} key = {index}/>
        )
      })}
    </main>
  )
}
export default ClientHomeContent;
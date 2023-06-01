// dependencies
import { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const EditPostedJob = () => { 
  const { clientSingleJob, setClientSingleJob, setRefresh } = useContext(UserContext);
  const { id } = useParams();
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [postedJobDetails, setPostedJobDetails] = useState({
    title: clientSingleJob?.title,
    description: clientSingleJob?.description,
    price: clientSingleJob?.price,
    experience: clientSingleJob?.experience,
    skills: clientSingleJob?.skills.join(", ")
  });
  useEffect(() => {
    if (!clientSingleJob) {
      axios.get("/singlejob/" + id).then((res) => {
        setClientSingleJob(res.data);
        setPostedJobDetails((prev) => {
          return {
            title: res.data?.title,
            description: res.data?.description,
            price:res.data?.price,
            experience: res.data?.experience,
            skills: res.data?.skills.join(", ")
          }
        })
      }).catch((e) => {
        console.log(e);
      })
    }
  }, []);
  function handleChange(e) {
    const { value, name } = e.target;
    setPostedJobDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  function editJob() {
    setLoading(styles)
    setDisabled(true)
    axios.put("/editjob/" + id, postedJobDetails).then((res) => {
      setPostedJobDetails(res);
      setLoading({})
      setDisabled(false)
      setRefresh("edited");
    }).catch((e) => {
      console.log(e)
      setLoading({})
      setDisabled(false)
    })
  }
  if (postedJobDetails.status === 200) {
    return <Navigate to={"/dashboard/" + id} />
  }

  return (
    <>
      {!clientSingleJob && <Loading />}
      <main id="single_job_application_page">
        <div className="single_job_application_page_container">
          <header>
            <label for="post_job">Write your job title</label>
            <input type="text" name="title" className="input" value={postedJobDetails.title} onChange={handleChange} />
          </header>
          <div className="border"></div>
          <main>
            <article>
              <label for="job_description">Write your job description</label>
              <textarea className="textarea" name="description" value={postedJobDetails.description} onChange={handleChange}></textarea>
            </article>

            <div className="border"></div>

            <article className="single_job_page_price_experience_level single_job_page_price_experience_level_modifier">
              <div>
                <label for="post_job_price">Specify price</label>
                <input type="text" name="price" className="input" onChange={handleChange} value={postedJobDetails.price} />
              </div>
              <div>
                <label for="post_job_experience">Specify experience level (entry, intermediate, experienced, or other specification)</label>
                <input type="text" name="experience" className="input" onChange={handleChange} value={postedJobDetails.experience} />
              </div>
            </article>

            <div className="border"></div>

            <article>
              <div>
                <label for="post_job_skills">Skills and Expertise</label>
                <textarea className="textarea" name="skills" onChange={handleChange} value={postedJobDetails.skills}></textarea>
              </div>
            </article>

            <div className="border"></div>

            <article className="single_job_page_btns_save_apply" style={{ marginBottom: "1em" }}>
              <button className="btn_edit_profile_2" onClick={editJob} style={loading} disabled = {disabled}>Edit</button>
            </article>
          </main>
        </div>

      </main>
    </>
  )
}
export default EditPostedJob;
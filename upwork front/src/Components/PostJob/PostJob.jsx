// depndencies
import { useState, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// files
import { UserContext } from "../../Context";
//variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const PostJob = () => {
  const { setRefresh } = useContext(UserContext);
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    price: "",
    experience: "",
    skills: ""
  });
  function handleChange(e) {
    const { value, name } = e.target;
    setJobDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  function postJob() {
    setLoading(styles);
    setDisabled(true)
    axios.post("/postjob", jobDetails).then((res) => {
      setJobDetails(res);
      setLoading({});
      setDisabled(false);
      setRefresh("refresh");
    }).catch((e) => {
      console.log(e)
      setLoading({})
      setDisabled(false)
    })
  }
  if (jobDetails.status === 200) {
    return <Navigate to={"/dashboard"} />
  }
  return (
    <main id="single_job_application_page">
      <div className="single_job_application_page_container">
        <header>
          <label htmlFor="title">Write your job title</label>
          <input type="text" name="title" className="input" onChange={handleChange} value={jobDetails.title} />
        </header>
        <div className="border"></div>
        <main>
          <article>
            <label htmlFor="description">Write your job description</label>
            <textarea className="textarea" name="description" onChange={handleChange} value={jobDetails.description}></textarea>
          </article>

          <div className="border"></div>

          <article className="single_job_page_price_experience_level single_job_page_price_experience_level_modifier">
            <div>
              <label htmlFor="price">Specify price per hour</label>
              <input type="text" name="price" className="input" onChange={handleChange} value={jobDetails.price} />
            </div>
            <div>
              <label htmlFor="experience">Specify experience level (entry, intermediate, experienced, or other specification)</label>
              <input type="text" name="experience" className="input" onChange={handleChange} value={jobDetails.experience} />
            </div>
          </article>

          <div className="border"></div>

          <article>
            <div>
              <label htmlFor="skills">Skills and Expertise separated by a comma</label>
              <textarea className="textarea" name="skills" placeholder="Specify skills required separated by a comma" onChange={handleChange} value={jobDetails.skills}></textarea>
            </div>
          </article>

          <div className="border"></div>

          <article className="single_job_page_btns_save_apply">
            <button className="btn_edit_profile_2" onClick={postJob} style={loading} disabled = {disabled}>Post</button>
          </article>
        </main>
      </div>
    </main>
  )
}
export default PostJob;
// dependencies
import { useContext, useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import axios from "axios";
// files
import { UserContext } from "../../Context";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const Proposal = () => {
  const { singleJob, setSingleJob, user } = useContext(UserContext);
  const { id } = useParams();
  const [proposal, setProposal] = useState({
    price: "",
    proposaltext: "",
    specific_job: id
  });
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!singleJob) {
      axios.get("/singlejob/" + id).then((res) => {
        setSingleJob(res.data);
      }).catch((e) => {
        console.log(e);
      });
    }
  }, []);
  function submitProposal() {
    setLoading(styles)
    setDisabled(true)
    axios.post("/submitproposal/" + user._id, proposal).then((res) => {
      setLoading({})
      setDisabled(false)
      setProposal(res);
    }).catch((e) => {
      console.log(e);
      setLoading({})
      setDisabled(false)
    })
  }
  if (proposal?.status === 200) {
    return <Navigate to={"/dashboard"} />
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setProposal((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  return (
    <main id="single_job_application_page">
      <div className="single_job_application_page_container">
        <header>
          <h2>{singleJob?.title}</h2>
          <p>Posted</p>
        </header>
        <div className="border"></div>
        <main>
          <article>
            <h4>Write a proposal</h4>
            <textarea className="textarea" name="proposaltext" value={proposal.proposaltext} onChange={handleChange}></textarea>
          </article>

          <div className="border"></div>

          <article className="single_job_page_price_experience_level" style={{ flexDirection: "column" }}>
            <div>
              <h4>State your price per hour</h4>
              <input className="input" name="price" type="text" value={proposal.price} onChange={handleChange} />
              <p>Fixed Price</p>
            </div>
            <div style={{ marginTop: "1em" }}>
              <p>Experience level</p>
              <h4>{singleJob?.experience}</h4>
            </div>
          </article>

          <div className="border"></div>

          <article>
            <h4>Skills and Expertise</h4>
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
            <button className="btn_edit_profile_2" onClick={submitProposal} style={loading} disabled = {disabled}>Apply</button>
            <Link to={"/dashboard/" + id} className="btn_edit_profile_1 link" >Back</Link>
          </article>
        </main>
      </div>

    </main>
  )
}
export default Proposal;
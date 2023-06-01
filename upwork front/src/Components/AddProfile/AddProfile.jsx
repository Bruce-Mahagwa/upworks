// dependencies
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
//variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const AddProfile = () => {
  const { user, profile, setProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // check if profile was already created
  
  let id;
  if (user) {
    id = user?._id;
  }

  // check if profile exists
  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get("/checkProfile/" + id).then((res) => {
        setLoading(false);
        setProfile(res.data)
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      })
    }
  }, [id])
  
  function handlePhotoUpload(e) {
    const file = e.target.files;
    const data = new FormData();
    setLoadingImage(true)
    data.append("photos", file[0]);
    axios.post("/uploads", data, {
      headers: {
        "Content-type": "multipart/form-data"
      }
    }).then((res) => {
      const { data } = res;
      setLoadingImage(false);
      setProfile((prev) => {
        return {
          ...prev,
          image: data
        }
      })
    })
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setProfile((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  function submitProfile(e) {
    e.preventDefault();
    setLoadingBtn(styles)
    setDisabled(true)
    axios.post("/addprofile", { profile }).then((res) => {
      setLoadingBtn({})
      setDisabled(false)
      setRedirect(true);
    }).catch((e) => {
      console.log(e);
      setLoadingBtn({})
      setDisabled(false)
    })
  }
  if (redirect === true) {
      return <Navigate to={"/dashboard/profile/" + user._id} />
  }
  return (
    <>
      {loading && <Loading />}
    <main id="add_profile">
      <header className="edit_profile_header">
        <h3>Add Photo</h3>
      </header>

      <main id="edit_profile_container_pic" className="edit_profile_container">
        <section>
          {loadingImage && <Loading />}
          <img src={`https://upworksbackend.brucejacob.repl.co/uploads/${profile?.image}`} alt="profile pic" />
        </section>

        <section>
          <p>Must be an actual photo of you</p>
          <div>
            <label className="btn_edit_profile_1" style = {{textDecoration: "none"}}>
              Change Photo
              <input type="file" className="btn_edit_profile_upload" onChange={handlePhotoUpload} />
            </label>
          </div>
        </section>
      </main>


      <header className="edit_profile_header">
        <h3>Add your Title</h3>
      </header>
      <main id="edit_profile_container_title" className="edit_profile_container">
        <header>
          <h4>Your Title</h4>
          <p>Enter a single sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)</p>
        </header>
        <main>
          <input type="text" name="title" onChange={handleChange} value={profile?.title} />
        </main>
      </main>

      <header className="edit_profile_header">
        <h3>Overview</h3>
      </header>

      <main id="edit_profile_container_overview" className="edit_profile_container">
        <aside id="edit_profile_container_overview_aside" className="edit_profile_container_aside" style={{ textAlign: "left" }}>
          <p>Use this space to show clients you have the skills and experience they're looking for.</p>
          <ul>
            <li>Describe your strengths and skills</li>
            <li>Highlight projects, accomplishments and education</li>
            <li>Keep it short and make sure it's error-free</li>
          </ul>
        </aside>
        <section>
          <textarea className="edit_profile_textarea" onChange={handleChange} value={profile?.overview} name="overview"></textarea>
          <p style={{ textAlign: "right" }}><span>4000</span> characters left</p>
        </section>
      </main>

      <header className="edit_profile_header">
        <h3>Add your Hourly Rate</h3>
      </header>

      <main id="edit_profile_container_hourly_rate" className="edit_profile_container">
        <aside id="edit_profile_container_hourly_rate_aside" className="edit_profile_container_aside" style={{ textAlign: "left" }}>
          <p>Please note that your new hourly rate will only apply to new contracts.The Upwork Service Fee is 20% when you begin a contract with a new client.Once you bill over $500 with your client, the fee will be 10%.</p>
          <p>Your profile rate is <span>${profile?.hourly_rate * 0.9 || 0}</span>/hr</p>
        </aside>
        <section>
          <h4>Hourly Rate</h4>
          <p>Total Amount the Client will see</p>
          <input type="number" name="hourly_rate" onChange={handleChange} value={profile?.hourly_rate} />
        </section>
        <section>
          <h4>10% Upwork Service Fee</h4>
          <input type="number" name="hourly_rate" disabled={true} value={profile?.hourly_rate * 0.1} />
        </section>
        <section>
          <h4>You'll Receive</h4>
          <p>Estimated Amount you'll receive after Service Fee</p>
          <input type="number" name="hourly_rate" disabled={true} value={profile?.hourly_rate * 0.9} />
        </section>
      </main>

      <header className="edit_profile_header">
        <h3>Skills</h3>
      </header>
      <main id="edit_profile_container_skills" className="edit_profile_container">
        <section>
          <h3 style={{ textAlign: "center" }}>Skills</h3>
          <textarea className="edit_profile_textarea" onChange={handleChange} value={profile?.skills} name="skills" placeholder="Add skills separated by a comma"></textarea>
          <p style={{ textAlign: "left" }}>Maximum 15 skills</p>
        </section>
      </main>

      <footer id="edit_profile_container_overview_footer" style={{ width: "100%", textAlign: "right", marginBottom: "2em" }}>
        <button className="btn_edit_profile_2" onClick={submitProfile} style = {loadingBtn} disabled = {disabled}>Save</button>
      </footer>

    </main>
    </>
  )
}
export default AddProfile;
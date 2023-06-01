// files
import EditTitle from "./EditTitle";
import EditSkills from "./EditSkills";
import EditPhoto from "./EditPhoto";
import EditOverview from "./EditOverview";
import EditHourly from "./EditHourlyRate";
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// dependencies
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
const Profile = () => {
  const [title, setTitle] = useState(false);
  const [skills, setSkills] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [overview, setOverview] = useState(false);
  const [hourly, setHourly] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(false);
  // used for adding a position fixed to the main tag
  const [position, setPosition] = useState("")
  const [loading, setLoading] = useState(false);
  const { user, profile, setProfile } = useContext(UserContext);

  let id;
  if (user) {
    id = user?._id
  }
  useEffect(() => {
    setLoading(true);
    axios.get("/checkProfile/" + id).then((res) => {
      setLoading(false);
      setProfile(res.data)
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
  }, [id, checkUpdate])
  
  if (profile === null) {
    return <Navigate to={"/dashboard/addprofile/" + id} />
  }
  
  return (
    <>
      {loading && <Loading />}
      {profile && <main style={{ position: `${position}` }}>
        <header id="profile_header">
          <div className="profile_header_intro">
            <h1>Better market your expertise with specialized profiles</h1>
            <p>Specialized profiles allow you to display more specific skills, deliverables, and more – and help power better search results and job recommendations</p>
          </div>

          <div className="border"></div>
          <div className="border"></div>

          <div className="profile_header_info">
            <div className="profile_header_img_svg_container">
              <img src={`https://upworksbackend.brucejacob.repl.co/uploads/${profile?.image}`} alt="profile picture" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 profile_svg" onClick={() => { setPhoto(true); setPosition("fixed") }}>
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </div>
            <div>
              <h3>{user?.firstname} {user?.lastname}</h3>
              <p>{user?.country}</p>
            </div>
          </div>
        </header>

        <main id="profile_main">
          <div className="border"></div>
          <div className="border" style={{ marginBottom: "1em" }}></div>
          <section id="total_earnings">
            <div>
              <h3>$1K+</h3>
              <p>Total Earnings</p>
            </div>
            <div>
              <h3>1</h3>
              <p>Total Jobs</p>
            </div>
          </section>

          <section id="work_section">
            <div className="border"></div>
            <div className="border" style={{ marginBottom: "1em" }}></div>
            <header>
              <div className="work_section_svg_container">
                <h3>{profile?.title} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 profile_svg" onClick={() => { setTitle(true); setPosition("fixed") }}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg></h3>
              </div>
              <p>Specializes in</p>
            </header>
            <main>
              <article>
                <h3>{profile?.hourly_rate}/hr <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 profile_svg" onClick={() => { setHourly(true); setPosition("fixed") }}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg></h3>
              </article>
              <article>
                <p>{profile?.overview}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 profile_svg" onClick={() => { setOverview(true); setPosition("fixed") }}>
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg></p>
              </article>
            </main>
            <div className="border" style={{ marginTop: "2em" }}></div>
            <div className="border" style={{ marginBottom: "1em" }}></div>
          </section>

          <section id="profile_skills">
            <header>
              <h3>Skills <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 profile_svg" onClick={() => { setSkills(true); setPosition("fixed") }}>
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg></h3>
            </header>
            <main>
              {Array.isArray(profile?.skills) && profile?.skills.map((item) => {
                return (
                  <button className="skills_btn" disabled={true} key={item}>{item}</button>
                )
              })}
            </main>
          </section>
        </main>
      </main>
}
      {photo && <EditPhoto setState={setPhoto} setPosition={setPosition} setCheckUpdate={setCheckUpdate} />}
      {overview && <EditOverview setState={setOverview} setPosition={setPosition} setCheckUpdate={setCheckUpdate} />}
      {hourly && <EditHourly setState={setHourly} setPosition={setPosition} setCheckUpdate={setCheckUpdate} />}
      {skills && <EditSkills setState={setSkills} setPosition={setPosition} setCheckUpdate={setCheckUpdate} />}
      {title && <EditTitle setState={setTitle} setPosition={setPosition} setCheckUpdate={setCheckUpdate} />}          
    </>
  )
}
export default Profile;
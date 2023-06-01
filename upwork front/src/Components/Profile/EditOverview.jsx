// dependencies
import {useContext, useState} from "react"
import {useParams} from "react-router-dom";
import axios from "axios";
// files
import {UserContext} from "../../Context";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const EditOverview = ({setState, setPosition, setCheckUpdate}) => {
  const {profile, setProfile} = useContext(UserContext);
  const [loading, setLoading] = useState({})
  const [disabled, setDisabled] = useState(false);
  const [overview, setOverview] = useState(profile?.overview);
  const {id} = useParams();
  function updateOverview() {
    setLoading(styles)
    setDisabled(true)
    axios.put("/updateoverview/" + id, {overview}).then((res) => {
      setLoading({})
      setDisabled(false)
      setProfile(res.data);
      setCheckUpdate(res.data.overview);
      setState(false);
      setPosition("");
    }).catch((e) => {
      console.log(e)
      setLoading({})
      setDisabled(false)
    })
  }
  return (
    <main className = "edit_container">
      <div className = "edit_container_profile_div">
  <header className = "edit_profile_header">
		<h3>Overview</h3>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick = {() => {setState(false); setPosition("")}}>
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>
  </header>
  
    <aside id = "edit_profile_container_overview_aside" className = "edit_profile_container_aside">
    	<p>Use this space to show clients you have the skills and experience they're looking for.</p>
    	<ul>
    		<li>Describe your strengths and skills</li>
    		<li>Highlight projects, accomplishments and education</li>
    		<li>Keep it short and make sure it's error-free</li>
    	</ul>
     </aside>
    <main id = "edit_profile_container_overview" className = "edit_profile_container_2">
    	<section>
    		<textarea className = "edit_profile_textarea" value = {overview} name = "overview" onChange = {(e) => setOverview(e.target.value)}></textarea>
    		<p style = {{textAlign: "right"}}><span>4000</span> characters left</p>
    	</section>
    </main>
    
    <footer id = "edit_profile_container_overview_footer" style = {{width: "100%", textAlign: "right", marginBottom: "2em"}}>
    	<button className = "btn_edit_profile_1" style = {{marginRight: "1em"}}>Cancel</button>
    	<button className = "btn_edit_profile_2" onClick = {updateOverview} style = {loading} disabled = {disabled}>Save</button>
    </footer>
      </div>
    </main>
  )
}
export default EditOverview;
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
const EditTitle = ({setState, setPosition, setCheckUpdate}) => {
  const {profile, setProfile} = useContext(UserContext);
  const [loading, setLoading] = useState({})
  const [disabled, setDisabled] = useState(false);
  const [title, setTitle] = useState(profile?.title);
  const {id} = useParams();
  function updateTitle() {
    setLoading(styles)
    setDisabled(true)
    axios.put("/updatetitle/" + id, {title}).then((res) => {
      setLoading({})
      setDisabled(false)
      setProfile(res.data);
      setCheckUpdate(res.data.title);
      setState(false);
      setPosition("");
    }).catch((e)=> {
      console.log(e);
      setLoading({})
      setDisabled(false)
    })
  }
  return (
    <main className="edit_container">
      <div className = "edit_container_profile_div">
      <header className="edit_profile_header">
        <h3>Edit your Title</h3>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick = {() => {setState(false); setPosition("")}}>
          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
        </svg>
      </header>

      <main id="edit_profile_container_title" className="edit_profile_container">
        <header>
          <h4>Your Title</h4>
          <p>Enter a single sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)</p>
        </header>
        <main>
          <input type="text" name="title" value = {title} onChange = {(e) => setTitle(e.target.value)} />
        </main>
        <footer>
          <button className="btn_edit_profile_1">Cancel</button>
          <button className="btn_edit_profile_2" onClick = {updateTitle} style = {loading} disabled = {disabled}>Save</button>
        </footer>
      </main>
        </div>
    </main>
  )
}
export default EditTitle;
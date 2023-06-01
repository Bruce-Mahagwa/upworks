// dependencies
import { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const EditPhoto = ({ setState, setPosition, setCheckUpdate }) => {
  const { profile, setProfile } = useContext(UserContext);
  const [loading, setLoading] = useState({})
  const [disabled, setDisabled] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [image, setImage] = useState(profile?.image);
  const { id } = useParams();
  function handlePhotoUpload(e) {
    const file = e.target.files;
    const data = new FormData();
    data.append("photos", file[0]);
    setLoading(styles)
    setDisabled(true)
    axios.post("/uploads", data, {
      headers: {
        "Content-type": "multipart/form-data"
      }
    }).then((res) => {
      const { data } = res;
      setLoading({})
      setDisabled(false)
      setImage(data)
    }).catch((e) => {
      console.log(e)
      setLoading({})
      setDisabled(false)
    })
  }
    function updatePhoto() { 
      setLoading(styles)
      setDisabled(true)
      setLoadingImage(true)
      axios.put("/updateimage/" + id, { image }).then((res) => {
        setLoading({})
        setDisabled(false)
        setLoadingImage(false)
        setProfile(res.data);
        setCheckUpdate(res.data.image);
        setState(false);
        setPosition("");
      })
    }
    return (
      <main className="edit_container">
        <div className="edit_container_profile_div">
          <header className="edit_profile_header">
            <h3>Edit Photo</h3>
            <p>Select image and press save</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => { setState(false); setPosition("") }}>
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </header>

          <main id="edit_profile_container_pic" className="edit_profile_container"> 
            <section>
              {loadingImage && <Loading />}
              <img src={image ? `https://upworksbackend.brucejacob.repl.co/uploads/${image}`:`https://upworksbackend.brucejacob.repl.co/uploads/${profile?.image}`} alt="profile picture" />
            </section>

            <section>
              <p>Must be an actual photo of you</p>
              <div>
                <label className="btn_edit_profile_1">
                  Change Photo
                  <input type="file" className="btn_edit_profile_upload" onChange={handlePhotoUpload} />
                </label>
                <button className="btn_edit_profile_2" onClick={updatePhoto} style = {loading} disabled = {disabled}>Save Photo</button>
              </div>
            </section>
          </main>
        </div>
      </main>
    )
  }
  export default EditPhoto;
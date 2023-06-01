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
const EditHourlyRate = ({setState, setPosition, setCheckUpdate}) => {
  const {profile, setProfile} = useContext(UserContext);
  const [loading, setLoading] = useState({})
  const [disabled, setDisabled] = useState(false);
  const [hourly_rate, setHourlyRate] = useState(profile?.hourly_rate);
  const {id} = useParams();
  function updateHours() {
    setLoading(styles)
    setDisabled(true)
    axios.put("/updatehours/" + id, {hourly_rate}).then((res) => {
      setLoading({})
      setDisabled(false)
      setProfile(res.data);
      setCheckUpdate(res.data.hours);
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
		<h3>Edit your Hourly Rate</h3>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick = {() => {setState(false); setPosition("")}}>
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
</svg>
    </header>
    
    <aside id = "edit_profile_container_hourly_rate_aside" className = "edit_profile_container_aside">
    	<p>Please note that your new hourly rate will only apply to new contracts.The Upwork Service Fee is 20% when you begin a contract with a new client.Once you bill over $500 with your client, the fee will be 10%.</p>
    	<p>Your profile rate is <span>${hourly_rate}</span>/hr</p>
    </aside>
    <main id = "edit_profile_container_hourly_rate" className = "edit_profile_container_2">
    	<section>
    		<h4>Hourly Rate</h4>
    		<p>Total Amount the Client will see</p>
    		<input type = "number" name = "hourly_rate" value = {hourly_rate} onChange = {(e) => setHourlyRate(e.target.value)} />
    	</section>
    	<section>
    		<h4>20% Upwork Service Fee</h4>
    		<input type = "number" name = "hourly_rate" disabled = {true} value = {hourly_rate * 0.2} />
    	</section>
    	<section>
    		<h4>You'll Receive</h4>
    		<p>Estimated Amount you'll receive after Service Fee</p>
    		<input type = "number" name = "hourly_rate" disabled = {true} value = {hourly_rate * 0.8} />
    	</section>
    </main>
    <footer id = "edit_profile_container_hourly_rate_footer">
    	<button className  = "btn_edit_profile_1">Cancel</button>
    	<button className = "btn_edit_profile_2" onClick = {updateHours} style = {loading} disabled = {disabled}>Save</button>
    </footer>
    </div>
    </main>
  )
}
export default EditHourlyRate;
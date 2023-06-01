// dependencines
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// files
import { UserContext } from "../../Context";
import Loading from "../Loading/Loading";
// variables
const styles = {
  background: "gray",
  cursor: "not-allowed"
}
const Content = ({ proposal, setRefreshProposals }) => {
  const [loading, setLoading] = useState({});
  const [disabled, setDisabled] = useState(false);
  // delete proposal
  function deleteProposal() {
    setLoading(styles)
    setDisabled(true)
    const id = proposal._id;
    axios.delete("/deletefreelancerproposal", { data: { id: id } }).then((res) => {
      setLoading({})
      setDisabled(false);
      setRefreshProposals(res.data._id);
    }).catch((e) => {
      setLoading({})
      setDisabled(false)
    })
  }

  return (
    <main>
      <div className="proposal_page_main_div">
        <div>
          <button className="btn_edit_profile_1">{proposal?.specific_job?.title || "no title"}</button>
          <button className="btn_edit_profile_2" onClick={deleteProposal} style={loading} disabled = {disabled}>Delete</button>
        </div>
        <div className="border"></div>
      </div>
    </main>
  )
}

const MyProposals = () => {
  const { user, freelancerProposals, setFreelancerProposals, refreshProposals, setRefreshProposals } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      axios.get("/freelancerproposals/" + user._id).then((res) => {
        setFreelancerProposals(res.data);
      })
    }
  }, [])
  useEffect(() => {
    if (user) {
      axios.get("/freelancerproposals/" + user?._id).then((res) => {
        setFreelancerProposals(res.data);
      })
    }
  }, [refreshProposals])
  return (
    <>
      {!user && <Loading />}
      <header id="proposal_page_header">
        <h2>My Proposals</h2>
      </header>
      <main id="proposal_page_main">
        <header>
          <h3>Submitted Proposals (<span>{freelancerProposals?.length || 0}</span>)</h3>
        </header>
        {freelancerProposals?.map((proposal) => {
          return (
            <Content proposal={proposal} setRefreshProposals={setRefreshProposals} key={proposal} />
          )
        })}
      </main>
    </>
  )
}
export default MyProposals;
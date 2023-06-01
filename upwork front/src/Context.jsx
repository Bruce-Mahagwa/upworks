// dependencies
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
//variables
const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  // when page is refreshed it will fetch data about the user
  useEffect(() => {
    if (user === null) {
      setLoading(true);
      axios.get("/profile").then((res) => {
        setUser(res.data);
        setReady(true);
        setLoading(false);
      }).catch((e) => {
        console.log(e)
        setLoading(false);
      })
    }
  }, []);

  // profile
  const [profile, setProfile] = useState({
    image: "https://picsum.photos/200/300",
    title: "Freelancer",
    overview: "A freelancer",
    hourly_rate: 10,
    skills: []
  });

  // client posted jobs;
  const [postedJobs, setPostedJobs] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [clientSingleJob, setClientSingleJob] = useState(null);
  useEffect(() => {
    axios.get("/getpostedjobs").then((res) => {
      setPostedJobs(res.data);
    }).catch((e) => {
      console.log(e);
    })
  }, [refresh]);
  // freelancer get available jobs
  const [allJobs, setAllJobs] = useState(null);
  const [refreshAllJobs, setRefreshAllJobs] = useState(false);
  const [singleJob, setSingleJob] = useState(null);
  useEffect(() => {
    if (user) {
      axios.get("/allavailablejobs").then((res) => {
        setAllJobs(res.data);
      }).catch((e) => {
        console.log(e)
      })
    }
  }, [refreshAllJobs]);
  // frelancer get submitted proposals
  const [freelancerProposals, setFreelancerProposals] = useState(null);
  const [refreshProposals, setRefreshProposals] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady, profile, setProfile, loading, postedJobs, refresh, setRefresh, allJobs, setRefreshAllJobs, singleJob, setSingleJob, clientSingleJob, setClientSingleJob, freelancerProposals, setFreelancerProposals, refreshProposals, setRefreshProposals}}>
      {children}
    </UserContext.Provider>
  )
}
export { UserContextProvider, UserContext };
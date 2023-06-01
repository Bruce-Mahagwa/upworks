// css imports
import './App.css'
// pages imports
import LoginPage from "./Pages/Login/LoginPage";
import RegisterPage from "./Pages/Register/RegisterPage";
import RegisterPageFreelancer from "./Pages/Register/RegisterPageFreelancer";
import RegisterPageClient from "./Pages/Register/RegisterPageClient";
import { UserContextProvider } from "./Context";
import NavigationFooterPage from "./Pages/Layout/NavigationFooterPage";
import HomePageContent from "./Pages/HomePageContent/HomePageContent";
import ProfilePage from "./Pages/Profile/ProfilePage";
import AddProfilePage from "./Pages/AddProfilePage/AddProfilePage";
import PostJobPage from "./Pages/PostJob/PostJobPage";
import SingleJobPage from "./Pages/SingleJobPage/SingleJobPage";
import ProposalPage from "./Pages/ProposalPage/ProposalPage";
import EditJobPage from "./Pages/EditJobPage/EditJobPage";
import MyProposalPage from './Pages/MyProposalsPage/MyProposalPage';
import SoonToCome from "./Pages/SoonToCome/SoonToCome";
// dependencies imports
import { Routes, Route } from "react-router-dom";
import axios from "axios";
export default function App() {

  // default axios urls
  axios.defaults.baseURL = "https://upworksbackend.brucejacob.repl.co";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/register/freelancer" element={<RegisterPageFreelancer />}></Route>
        <Route path="/register/client" element={<RegisterPageClient />}></Route>
        {/*  */}
        <Route path="/dashboard" element={<NavigationFooterPage />}>
          <Route index element={<HomePageContent />}></Route>
          <Route path="/dashboard/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/dashboard/addprofile/:id" element={<AddProfilePage />}></Route>
          <Route path="/dashboard/postjob" element={<PostJobPage />}></Route>
          <Route path="/dashboard/:id" element={<SingleJobPage />}></Route>
          <Route path="/dashboard/proposal/:id" element={<ProposalPage />}></Route>
          <Route path="/dashboard/editjob/:id" element={<EditJobPage />}></Route>
          <Route path="/dashboard/myproposals" element={<MyProposalPage />}></Route>
          <Route path="/dashboard/soon" element={<SoonToCome />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

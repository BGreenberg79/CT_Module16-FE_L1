import { Route, Routes } from "react-router-dom";
import GetUserDetails from "./components/GetUserDetails";
import GetUserPosts from "./components/GetUserPosts";
import ManagePosts from "./components/ManagePosts";
import FetchAlbumsAndPhotos from "./components/FetchAlbumsAndPhotos";
import FetchAndManageTodos from "./components/FetchAndManageTodos";
import Home from "./components/Home";
import NavBar from "./components/NavBar";


function App() {


  return (
    <>
      <NavBar/>  
      <Routes>
        <Route element={<GetUserDetails/>} path="/user-details/:userId"/>
        <Route element={<GetUserPosts/>} path="/user-posts/:userId"/>
        <Route element={<ManagePosts/>} path="/manage-posts"/>
        <Route element={<FetchAlbumsAndPhotos/>} path="/albums"/>
        <Route path="/todos" element={<FetchAndManageTodos/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>

  )
}

export default App

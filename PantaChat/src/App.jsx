import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Container,Box } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import UpdateProfile from './pages/UpdateProfile'
import CreatePost from './components/CreatePost'
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import {Flex ,Link } from "@chakra-ui/react";
import Footer from './components/Footer'
import ChatPage from './pages/ChatPage'
function App() {    
  const user = useRecoilValue(userAtom)
  console.log({"user":user})
  return (
    <>  
    <Box position={"relative"} w='full'>
    <Container maxW="1000px">
      <Header/>
     <Routes>
       <Route path='/' element={user ? <Home /> : <Navigate to='/auth' />}/>
       <Route path='/auth' element={!user ? <Auth /> : <Navigate to='/' />}/>

       <Route path='/update' element={user ?<UpdateProfile/>:<Navigate to='/auth' /> }/> 


       <Route path='/:username/post/:pid' element={<PostPage/>}/>

     
       <Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage />
							)
						}
					/>
    

     <Route path='/chat' element={user ? <ChatPage /> : <Navigate to={"/auth"} />} />

     </Routes>

      </Container>

      </Box>
    </>
  )
}

export default App

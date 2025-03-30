import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Page/Login'
import Register from '../Page/Register'
import { Privateroute } from './Privateroute'
import { MediaPlayer } from '../Page/MediaPlayer'
import { Upload } from '../Page/Upload'
import { Dashboard } from '../Page/Dashboard'
export const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
             <Route path='/media' element={
<Privateroute><MediaPlayer/></Privateroute>


             }/>
            <Route path='/upload' element={

                <Privateroute><Upload/></Privateroute>
            }/>

            
        </Routes>
    </div>
  )
}

'use client'
import React from 'react'
import { useState } from 'react'
import Navbar from './navbar'
import { MaterialUISwitch } from './utils'



const Main = ({children}) => {
    const [mode,setMode]=useState(false)
  
  return (
    <div className={`${mode?'dark':null} flex`}>
    <Navbar/>
        {children}
          
        <button onClick={()=>setMode(!mode)} className=' fixed left-5 bottom-28'>
          <MaterialUISwitch/>
        </button>
        </div>
  )
}

export default Main
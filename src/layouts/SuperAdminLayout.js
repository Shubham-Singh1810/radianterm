import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperDashboard from '../pages/SuperDashboard'
import AddEmployee from '../pages/AddEmployee'
import MyProfile from '../pages/MyProfile'

function SuperAdminLayout() {
  return (
    <Routes>
        <Route path="/" element={<SuperDashboard/>}/>
        <Route path="/add-employee" element={<AddEmployee/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
    </Routes>
  )
}

export default SuperAdminLayout
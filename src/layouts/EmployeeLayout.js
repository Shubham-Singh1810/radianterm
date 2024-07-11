import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperDashboard from '../pages/SuperDashboard'
import AddEmployee from '../pages/AddEmployee'

function EmployeeLayout() {
  return (
    <Routes>
        <Route path="/" element={<SuperDashboard/>}/>
        <Route path="/add-employee" element={<AddEmployee/>}/>
    </Routes>
  )
}

export default EmployeeLayout
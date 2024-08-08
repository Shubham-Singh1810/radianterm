import React from 'react'
import ProjectTable from '../components/ProjectTable'

function PartiallyCompletedProject() {
  return (
    <div>
        <ProjectTable status={2}/>
    </div>
  )
}

export default PartiallyCompletedProject
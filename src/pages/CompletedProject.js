import React from 'react'
import ProjectTable from '../components/ProjectTable'

function CompletedProject() {
  return (
    <div>
        <ProjectTable status={3}/>
    </div>
  )
}

export default CompletedProject
import React, {useState, useEffect} from 'react'
import ProjectCarousel from './ProjectCarousel'
import ProjectAll from './ProjectAll'
import { fetchEffect } from '../../../axios/fetchEffect'
import axios from '../../../axios'


const ProjectIndex = () => {

  const [error, setError] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(()=> {
      fetchEffect(
        [setProjects, setError],
        'get',
        `/api/projects`
      )
  },[])

  return (
    <div className='project-index-container'>
      <ProjectCarousel projects={projects} />
      <ProjectAll projects={projects} />
    </div>
  )
}

export default ProjectIndex

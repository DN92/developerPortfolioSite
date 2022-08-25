import React, {useState, useMemo, useEffect} from 'react'
import ProjectIndividual from './ProjectIndividual'

const ProjectAll = ({projects}) => {

  const [selectedProject, setSelectedProject] = useState({title: 'Nothing loaded'})

  const getIndexSelectedProject = () => {
    if(!selectedProject.id) {
      return -1
    }
    return projects.findIndex(ele => ele.id === selectedProject.id)
  }

  const handlePrev = () => {
    const idx = getIndexSelectedProject()
    if(idx === -1) {
      console.log('missing id in button handler')
      return
    }
    if(idx - 1 < 0) {
      setSelectedProject(projects[projects.length - 1])
    } else {
      setSelectedProject(projects[idx - 1])
    }
  }

  const handleNext = () => {
    const idx = getIndexSelectedProject()
    if(idx === -1) {
      console.log('missing id in button handler')
      return
    }
    if(idx + 1 >= projects.length) {
      setSelectedProject(projects[0])
    } else {
      setSelectedProject(projects[idx + 1])
    }
  }

  useEffect(() => {
    if(projects.length) {
      setSelectedProject( projects.find(proj => proj.title == 'Planet Scottish Fold') || projects[0])
    }
  }, [projects])

  useEffect(() => {
    console.log(selectedProject)
  }, [selectedProject])

  return (
    <>
      <ProjectIndividual project={selectedProject}
        setSelectedProject={selectedProject}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </>
  )
}

export default ProjectAll

import React from 'react'
import { projectTest1, projectTest2 } from './projectTest'
import IFrameWrapper from '../../IFrameWrapper'

const ProjectWrapper = ({project}) => {
  project = project ? project : projectTest1
  // project = project ? project : projectTest2

  // "title": "",
  // "description": "",
  // "githubUrl": "",
  // "videoMainUrl": "",
  // "imageMainSrc": "",
//  'collaborators: []

  const iFrameSrc = 'https://www.youtube.com/embed/bOf4hEKrt_k'
  return (
    <div className='project-container'>
      <div className='project__header-wrapper'>
        <div className='project-header__title'>{project.title}</div>
        <div className='project-header__links'>
          <div className='project-link__github'>Github: {project.githubUrl}</div>
          {project.videoMainUrl && <div className='project-links__youtube'>{project.videoMainUrl}</div>}
        </div>
      </div>
      <IFrameWrapper classNames={['project-iframe-wrapper']} src={iFrameSrc} title={project.title} />
      <div className='project-info-wrapper'>
        <div className='project-info__description'>Description: {project.description}</div>
        {project.collaborators?.length > 0 &&
        <div className='project-info-collaborators'>
          <p>Collaborators</p>
          {project.collaborators.map((person, index) => (
            <div className='project-info__person' key={index}>
              {person}
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  )
}

export default ProjectWrapper

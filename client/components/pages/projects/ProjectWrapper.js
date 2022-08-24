import React from 'react'
import { projectTest1, projectTest2 } from './projectTest'
import IFrameWrapper from '../../IFrameWrapper'

const ProjectWrapper = ({project}) => {
  project = project ? project : projectTest1
  // project = project ? project : projectTest2

  return (
    <div className='project-container'>
      <div className='project__header-wrapper'>
        <h3 className='project-header__title'>{project.title}</h3>
        <div className='project-header__links'>
          {!!project.links?.websiteUrl &&
            <a className='project-link__website'
              href={ project.websiteUrl }
              target='_blank'
            >
              Deployed Site
            </a>
          }
          {!!project.links?.githubUrl &&
            <a className='project-link__github'
              href={project.githubUrl}
              target="_blank"
            >
              Github
            </a>
          }
          {!!project.links?.videoMainUrl &&
            <a className='project-links__youtube'
              to={project.videoMainUrl}
              target='_blank'
            >
              Youtube
            </a>
          }
        </div>
      </div>
      <IFrameWrapper classNames={['project-iframe-wrapper']}
        style={{backgroundImage: `url(${(project.links?.backgroundImg)})`}}
        src={project.links?.videoAsEmbed}
        title={project.title}
      />
      {/* project-spacing div is for css only */}
      <div className='project-spacing1'></div>
      <div className='project-info-wrapper'>
        <div className='project-info__description'>{project.description}</div>
        {project.collaborators?.length > 0 &&
        <div className='project-info-collaborators'>
          <h6>Collaborators</h6>
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

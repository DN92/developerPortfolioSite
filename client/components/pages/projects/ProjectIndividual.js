import React from 'react'
import IFrameWrapper from '../../IFrameWrapper'

const ProjectIndividual = ({
  project ={},
  handlePrev,
  handleNext,
}) => {

  return (
    <div className='project-container'>
      <div className='project__header-wrapper'>
        <h3 className='project-header__title'>{project.title}</h3>
        <div className='project-header__links'>
          {!!project.link?.websiteUrl &&
            <a className='project-link__website'
              href={ project.websiteUrl }
              target='_blank'
            >
              Website
            </a>
          }
          {!!project.link?.githubUrl &&
            <a className='project-link__github'
              href={project.githubUrl}
              target="_blank"
            >
              Github
            </a>
          }
          {!!project.link?.videoMainUrl &&
            <a className='project-links__youtube'
              to={project.videoMainUrl}
              target='_blank'
            >
              Youtube
            </a>
          }
        </div>
      </div>
      <div className='project-iframe-container'>
        <div className='iframe-buttons-wrapper'>
          <div className='project-last-button'>
            <button onClick={handlePrev} className='button1'>Back</button>
          </div>
          <div className='project-next-button'>
            <button onClick={handleNext} className='button1'>Next</button>
          </div>
        </div>
        {project.link?.videoAsEmbed ?
          <IFrameWrapper classNames={['project-iframe-wrapper']}
            style={{backgroundImage: `url(${(project.link?.backgroundImg)})`}}
            src={project.link?.videoAsEmbed}
            title={project.title}
          />
          :
          <div className='project-no-vid-backup'>
            <img src={project.link?.imageMainSrc} alt="" />
          </div>
        }
      </div>
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

export default ProjectIndividual

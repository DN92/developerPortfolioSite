const projectParse = (project) => {
  if(typeof project.collaborators === 'string') {
    if(!Array.isArray(Json.parse(project.collaborators))) {
      throw new Error('Input to Collaborators table of type: string was not a valid JSON array')
    }
    return
  }
  if(Array.isArray(project.collaborators)) {
    project.collaborators = JSON.stringify(project.collaborators)
    return
  }
  throw new Error('Unexpected input: Project.beforeCreate while attempting to stringify input to Collaborators')
}

const test1 = {
  title: "Play Date app",
  description: "This is a Description of the test project",
  collaborators: ['person1', 'person2', 'person3'],
  links: {
    githubUrl: "www.sampleUrlGithub.com",
    websiteUrl: 'https://appplaydate.herokuapp.com/',
    videoMainUrl: "vhttps://www.youtube.com/watch?v=bOf4hEKrt_k",
    videoAsEmbed: 'https://www.youtube.com/embed/bOf4hEKrt_k',
    imageMainSrc: "",
    backgroundImg: '/pictures/APDlogoRepeatable.png',
  },
}

projectParse(test1)

console.log(test1)

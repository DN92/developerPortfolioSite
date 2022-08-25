const playDateDescription = "An innovative way for parents to find each other and set meetups for their children."


const playDate = {
  title: "Play Date",
  description: playDateDescription,
  collaborators: ['person1', 'person2', 'person3'],
  status: 'complete',
  links: {
    githubUrl: "www.sampleUrlGithub.com",
    websiteUrl: 'https://appplaydate.herokuapp.com/',
    videoMainUrl: "vhttps://www.youtube.com/watch?v=bOf4hEKrt_k",
    videoAsEmbed: 'https://www.youtube.com/embed/bOf4hEKrt_k',
    imageMainSrc: '/pictures/APDlogoRepeatable.png',
    backgroundImg: '/pictures/APDlogoRepeatable.png',
  }
}
const psf = {
  title: "Planet Scottish Fold",
  description: "An in production web applications",
  collaborators: [],
  status: 'complete',
  links: {
    githubUrl: "DN92/planetScottishFold ",
    websiteUrl: 'https://www.planetscottishfold.com/',
    videoMainUrl: "",
    videoAsEmbed: "",
    imageMainSrc: "/pictures/psfThumbnail.png",
    backgroundImg: "/pictures/kittenDanissimaDaiquiri.jpeg",
  }
}

const stapler = {
  title: "Stapler",
  description: "An in production web applications",
  collaborators: ['Sabi Kumar', 'Peter Oehman','Antonio Scalfaro'],
  status: 'complete',
  links: {
    githubUrl: "https://github.com/DN92/stapler ",
    websiteUrl: 'https://stapler-anatoly-tsinker.herokuapp.com/',
    videoMainUrl: "",
    videoAsEmbed: "",
    imageMainSrc: "/pictures/staplerLogo.jpg",
    backgroundImg: "/pictures/staplerLogo.jpg",
  }
}

const myChessSite = {
  title: "Solid-Chess",
  description: "A simply chess app inspired by lichess",
  collaborators: [],
  status: 'in progress',
  links: {
    githubUrl: "https://github.com/DN92/appSolidChess",
    websiteUrl: 'https://my-chess-site.herokuapp.com/',
    videoMainUrl: "",
    videoAsEmbed: "",
    imageMainSrc: "/pictures/lichess-favicon-32.png",
    backgroundImg: "/pictures/lichess-favicon-32.png",
  }
}

module.exports = [playDate, psf, stapler, myChessSite]

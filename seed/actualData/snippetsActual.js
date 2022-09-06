const snippet1 = {
  name: 'Available Kittens React Component',
  linkToPage: 'https://www.planetscottishfold.com/availableKittens',
  description: 'Complicated React State with User Filter',
  codeSnippet: `const AvailableKittens = () => {

    const getWeight = (obj, filterer) => {
      let score = 0;
      for( const key in filterer) {
        if (filterer[key] === 'No Preference' || filterer[key] === '') continue;
        if(filterer[key]?.selection === obj[key]) score += filterer[key].weight
      }
      return score || 0
    }

    const [error, setError] = useState(null)
    const [kittens, setKittens] = useState([]);
    const [availableAdults, setAvailableAdults] = useState([])
    const [initAvailKittens, setInitAvailKittens] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [filterState, dispatchFilterState] = useReducer((state, action) => {
      switch (action.type) {
        case 'set':
          return {...state, [action.field]: {
            ...state[action.field],
            selection: action.value
            }
          };
        default:
          return {...state}
      }},
      {
        gender: {
          selection: 'No Preference',
          weight: 0.8,
        },
        ears: {
          selection: 'No Preference',
          weight: 1.1
        },
        eyeColor: {
          selection: 'No Preference',
          weight: 1.2
        },
      }
    )

    const unavailableKittens = useMemo(() => {
      return kittens.filter(kitten => kitten.status !== "Available" )
        .sort((a, b) => Number(b.price) - Number(a.price) )
    },[kittens]);

    const [availableKittens, dispatchAvailableKittens] = useReducer((state, action) => {
      switch(action.type) {
        case 'init':
          return  kittens.filter(kitten => kitten.status === "Available")
            .sort((a, b) => {
              if(b.mother < a.mother) {
                return 1
              } else {
                return -1
              }
          })
        case 'applyFilter': {
          const weightedArr = [...state].map(kitten => ([kitten, getWeight(kitten, filterState)]))
          weightedArr.sort((a, b) => (b[1] - a[1]))
          return weightedArr.map(kitten => kitten[0]);
        }
        default:
          return [...state]
      }
    }, [])

    const handleShowSearch = () => {
      setShowSearch(prev => !prev)
    }

    const handleFilterBySearch = () => {
      dispatchAvailableKittens({type: 'applyFilter'})
    }

    useEffect(() => {
      fetchEffect(
        [setKittens, setError],
        'get',
        "/api/kittens",
      );
      fetchEffect(
        [setAvailableAdults, setError],
        "get",
        "/api/catAsKitten"
      );
      setInitAvailKittens(true)
    }, [])

    useEffect(() => {
      if(initAvailKittens && kittens.length) {
        setInitAvailKittens(false)
        dispatchAvailableKittens({type: 'init'})
      }
    }, [kittens])

    return (
      <div className='kittens'>
        <h2>Our Available Kittens</h2>
        {error && <ErrorFill msg={error} />}
        {!error &&
          <>
            <div className='adv-search-wrapper'>
              <button id='adv-search-checkbox' className='adv-search-button buttonStyle2'
                type="button"
                onClick={handleShowSearch}
              >{showSearch ? 'Hide' : 'Sort By'}</button>
            </div>
            {showSearch && <KittenFilter searcher={handleFilterBySearch} filterState={filterState} dispatch={dispatchFilterState} />}
            <div className='kittensWrapper'>
              {availableKittens.map((kitten) => (
                <SingleKitten key={kitten.id} kitten={kitten} />
              ))}
            </div>
            <hr /><br />
            <h4>Available Adults</h4>
            <div className='kittensWrapper'>
              {availableAdults.map((cat) => (
                <SingleKitten key={cat.id} kitten={cat} />
              ))}
            </div>
            <hr /><br />
            <h4>Reserved and Sold</h4>
            <div className='kittensWrapper kittens-sold'>
              {unavailableKittens.map((kitten) => (
                  <SingleKitten key={kitten.id} kitten={kitten} />
                ))}
            </div>
          </>
        }
      </div>
    )
  }`,
  aboutPre: `This component has a very complicated state calculated with useState, useEffect, useMemo, and useReducer. It fetches two separate API routes, and then filters the fetch data into three (3) separate section on the page. The page then offers the user a form to further sort the content available on the page. Child components are passed down setters and dispatch methods to seamlessly update the parent on state change. `,
  aboutPost: ''
}

const snippet2 = {
  name: 'Pointers Only',
  description: 'No utility array or objects, no prototypes',
  codeSnippet: `function latterZeroes(array) {
    if(array.length < 2) return array;

    const flip = () => {
      let temp = array[pointer2]
      array[pointer2] = array[pointer1]
      array[pointer1] = temp
    }

    const checkZero = (idx) => (array[idx] === 0 || array[idx] === '0')

    let pointer2 = array.length - 1
    let pointer1 = array.length -2

    while(pointer1 > -1) {
      pointer2 = array.length - 1

      if(!checkZero(pointer1)) {
        pointer1 --
        continue
      }

      while(checkZero(pointer2)) {
        pointer2--
        if(pointer1 === pointer2) {
          pointer1 --
        }
      }

      while(pointer2 !== pointer1) {
        flip()
        pointer2--
      }
    }
    return array
  }`,
  aboutPre: 'Anyone that has ever played GoldenEye64 has some experience with the game mode slappers only. Well this is Pointers Only. We are given an algo problem with a twist. No utility arrays or objects. No values by reference other than the input array. And certainly no prototype methods. This is hard mode. Get your game face on. The prompt: Take an input array of positive integers in either string or number form and move all zeros to the end of the array. Space complexity can be no greater than O(1) and remember, no Array prototype methods. sample test : [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]'
}

const snippet3 = {
  name: 'Fetch Effect',
  description: 'One React fetch method to rule them all',
  codeSnippet: `import axios from '../axios'
  import { putTokenOnHeader } from './putTokenOnHeader'

  // setterFunc Array should include either just the state setter or the
  //  state setter followed by the error setter.
  //  method is the RESTFUL method
  //  path is the url, body is request body

  export const fetchEffect = async (setterFuncArray, method, path, body,) => {
    const acceptedRequestMethods = ['get', 'post', 'put', 'delete']
    //  check for valid method type
    if(!acceptedRequestMethods.includes(method)) {
      throw new Error('invalid request method. Request not sent')
    }
    //  if a token exits, put it on the headers.authorization
    try {
      const {data} = !['post', 'put'].includes(method) ?
      //  gets and deletes
        await axios[method](path, putTokenOnHeader()) :
        //  posts and puts
        await axios[method](path, body, putTokenOnHeader())
        // set state upon promise resolving
      if (setterFuncArray.length && method !== 'delete') {
        setterFuncArray[0](data)
    //  clear error if errorSetter was provided
      }
      if(setterFuncArray.length > 1) {
        setterFuncArray[1]('')
      }
    } catch(err) {
      console.error(err.message)
      if(setterFuncArray.length > 1) {
        setterFuncArray[1](err.message)
      }
    }
  }`,
  aboutPre: 'Fetching can sometimes be a headache. The general flow of code is to load our component, fetch some data, and set that data to component state after our promise resolves, and check for errors of course. I have been using this custom function to handle this general, often repeatable scenario. Using this function takes care not only the fetch, but setting the state, setting the error state, and it will even handles JWTs for you. ',
}

const snippet4 = {
  name: 'Planting a Seed',
  description: 'Sequelize seed file',
  aboutPre: 'Working with databases can be tricky, especially in production. We have to do a lot of testing before we launch an app. Seed files help to fill databases with test (or real) data and make sure everything is in order. This is the seed file for this site and based off a template I use. Postgres and Sequelize.',
  codeSnippet: `require('dotenv').config()

  const db = require ('../server/db')
  const models = require('../server/db/models')

  /**
   *  seed - this function clears the database, updates tables to
   *    match our models, and populates the database
   */

  const {User, Project, Link, Snippet} = models

  const usersTestData = require('./testData/usersTest')
  const projectActualData = require('./actualData/projectActual')
  const snippetActualData =require('./actualData/snippetsActual')

   async function seed() {
    console.log('sync db')
    await db.drop({force:true, cascade:true})
    await db.sync({force: true})  //  clears the db and matches models to tables
    console.log('begin seed')
    await Promise.all([
      //  import and then ..
      //  seed dummy / actual data here

      Promise.all(usersTestData.map(user => {
        return User.create(user)
      })),
      Promise.all(projectActualData.map(async project => {
        const links = await Link.create(project.links)
        const newProject = await Project.create(project)
        await newProject.setLink(links)
      })),
      Promise.all(snippetActualData.map( async snippet => {
        return Snippet.create(snippet)
      }))
    ])
  }

  // runSeed isolates error handling and exit trapping.

  async function runSeed(seedFunc) {
    try {
      console.log("Running database seed function")
      await seedFunc()
      console.log("Seed was successful")
    } catch (err) {
      console.log("Database seed failed")
      console.error(err)
      console.log(err.stack)
    } finally {
      console.log("Closing db connection")
      await db.close()
      console.log("DB connection closed")
    }
  }

  // execute our runSeed IF we ran this directly from Node ('node seed')

  if (module === require.main) {
    runSeed(seed);
  }`,
}

const snippet5 = {
  name: 'Iframe',
  description: 'A responsive Iframe wrapper',
  codeSnippet: `//  the options prop default shows the shape of the options obj but the defaulted values should not be used and are set to low values to visually indicate a problem.
  //  Options object will be ignored (other than the useDefault value itself) unless useDefault is set to false (or falsy)
  {
    useDefault: true
  }

  const IFrameWrapper = ({
    classNames = [],
    src,
    style,
    title = "",
    options = {
      useDefault: true,
      dimension: {
        height: '70px',
        width: '40px'
      }
    }
  }) => {

    const windowSize = useWindowSize()

    const sizeForIframe = useMemo(() => {

      if(windowSize.width <= 600) {
        return {
          width: windowSize.width,
          height: windowSize.width * 9 / 16
        }
      }

      if(!options.useDefault) {
        return {
          width: options.width,
          height: options.height,
        }
      }

      if(windowSize.width >= 1200) {
        return {
          width: '900',
          height: '506',
        }
      }

      if(windowSize.width >= 1000) {
        return {
          width: '700',
          height: '394',
        }
      }
      if(windowSize.width >= 800) {
        return {
          width: '600',
          height: '338',
        }
      }
      if(windowSize.width >= 600) {
        return {
          width: '500'
    ,     height: '281',
        }
      }

    }, [windowSize])

    //  another visual indicator is src was not provided
    if(!src) {
      return (
        <div>
          <p className='red'>No I Frame Source was provided</p>
          <p className='red'>No I Frame Source was provided</p>
          <p className='red'>No I Frame Source was provided</p>
        </div>
      )
    }

    return (
      <div className={[classNames.join(' ') + ' ' + 'iframe-wrapper']} style={style}>
        <iframe
          src={src}
          height={sizeForIframe.height}
          width={sizeForIframe.width}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture allowfullscreen"
          title={title}
          frameBorder="0"
        ></iframe>
      </div>
    )
  }

  export default IFrameWrapper`,
  aboutPre: 'A responsive Iframe wrapper that can be quickly used in any webpage with just a few input props. The only required prop is the Iframe source, but customization is obtainable via classnames, direct inline styles for the wrapper, and an options.useDefault prop to allow use of explicitly defined height and width (but will take away the responsiveness.)'
}

const snippet6 = {
  name: 'User Model',
  description: 'Basic, reusable Sequelize user model with class methods',
  codeSnippet: `const User = db.define("user", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    permissions: {
      type: Sequelize.ENUM(userTypes),
      defaultValue: userTypes[1]
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  })

  User.prototype.verifyPassword = async function (candidatePwd) {
    //we need to compare the plain version to an encrypted version of the password
    return await bcrypt.compare(candidatePwd, this.password);
  };


  const hashPassword = async (user) => {
    //in case the password has been changed, we want to encrypt it with bcrypt
    if (user.password && user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 6);
    }
  };

  const emailToLowerCase = async (user) => {
    if(user.email) {
      user.email = user.email.toLowerCase()
    }
  }

  User.beforeCreate(async user => {
    await hashPassword(user);
    emailToLowerCase(user);
  });
  User.beforeUpdate(async user => {
    await hashPassword(user);
    emailToLowerCase(user);
  });
  User.beforeBulkCreate(async users => {
    await Promise.all(users.map(user => {
      emailToLowerCase(user);
      return hashPassword(user);
    }))
  })
  User.beforeBulkUpdate(async users => {
    await Promise.all(users.map(user => {
      emailToLowerCase(user);
      return hashPassword(user);
    }))
  })

  module.exports = User
  `,
  aboutPre:  'Basic, reusable Sequelize user model with class methods.'
}

const snippet7 = {
  name: 'NavLink Component',
  description: 'Dynamically styled nav links based on current page.',
  aboutPre: 'As seen in this website, this component will dynamically style the main nav based on the currently selected url path.',
  codeSnippet: `const NavMainBody = () => {

    const {width : windowWidth} = useWindowSize();

    let location = useLocation();
    const focusedPage = useMemo(() => {
      if(location.pathname.length > 1) {
        const path = location.pathname.substring(1, location.pathname.length)
        const idx = path.search('/')
        if (idx === -1) {
          return '.nav-main__' + path
        } else {
          return '.nav-main__' + path.substring(0, idx)
        }
      }
    }, [location])

    useEffect(() => {
      const mainNav = document.querySelector('.nav-main')
      if(focusedPage) {
        const focusLink = document.querySelector(focusedPage);
        if(focusLink && mainNav) {
          mainNav.childNodes.forEach(child => {
            child.setAttribute('id', '')
          })
          focusLink.setAttribute('id', 'nav-main__selected')
        } else {
          mainNav?.childNodes.forEach(child => {
            child.setAttribute('id', '')
          })
        }
      }
    }, [focusedPage])

    return (
      <div className='header-container__body'>
        <div className='nav-h1-wrapper'>
          <Link to='/home'>
            <h1 id='h1'>Title Here</h1>
          </Link>
        </div>
        <nav className='nav-main'>
          <Link className='nav-main__projects' to='/projects'>Projects</Link>
          <Link className='nav-main__codeSnips' to='/codeSnips'>{windowWidth > 800 ? 'Code Examples' : 'Code'}</Link>
          <Link className='nav-main__aboutMe' to='/aboutMe'>{windowWidth > 800 ? 'About Me' : 'About'}</Link>
          <Link className='nav-main__contact' to='/contact'>Contact</Link>
        </nav>

      </div>
    )
  }`,
}

const snippet8 = {
  name: 'SM Navbar',
  description: 'Reusable Social Media Navbar.',
  aboutPre: 'Quickly turn links and icons into a social media navbar, reusable in any site, and usually used in at least 2 or more locations in each app.',
  codeSnippet: `
  const SocialMediaNavBar = () => {

    return (
      <nav className='sm-navbar'>
        {socialMediaInfo.map(platform  => (
          <SocialMediaIconWrapper key={platform.site} iconSrc={platform.iconSrc} href={platform.href} site={platform.site} />
        ))}
      </nav>
    )
  }

  export default SocialMediaNavBar
  ` + `
  const SocialMediaIconWrapper = ({iconSrc, href, site}) => {

    return (
      <div className='smIcon-wrapper'>
        <a href={href} target='_blank'>
          <img className='smIcon-image' src={iconSrc} alt={'link to ' + site} />
        </a>
      </div>
    )
  }

  export default SocialMediaIconWrapper
  ` + `
  const socialMediaInfo = [
    {
      site: 'instagram',
      href: 'https://www.instagram.com/link/',
      iconSrc: '/socialMediaIcons/instagram.png'
    },
    {
      site: 'facebook',
      href: 'https://www.facebook.com/link',
      iconSrc: '/socialMediaIcons/facebook.png'
    },
    {
      site: 'tiktok',
      href: 'https://www.tiktok.com/link',
      iconSrc: '/socialMediaIcons/tiktok.png'
    },
    {
      site: 'pintrest',
      href: 'https://www.pinterest.com/link',
      iconSrc: '/socialMediaIcons/pintrest.png'
    },
    {
      site: 'youtube',
      href: 'https://www.youtube.com/link',
      iconSrc: '/socialMediaIcons/youtube.png'
    },
  ]
  `
}

const snippets = [snippet1, snippet2, snippet3, snippet4, snippet5, snippet6, snippet7, snippet8]

module.exports = snippets

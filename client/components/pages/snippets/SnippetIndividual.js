import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const SnippetIndividual = ({snippet}) => {

  const [liked, setLiked] = useState(false)

  return (
    <div className='snippets-row'>
      <Link className='snippets-row-1'
        to={`/codeSnips/single/${snippet.id}`}
        state={{snippet: snippet}}
      >{snippet.name}</Link>
      <p className='snippets-row-2'>{snippet.description}</p>
      <div className='snippets-row-3'>
          <img className='snippets-thumb'
            src={liked ? "/pictures/upBlueSelected101.png" : "/pictures/upBnWunselected101.png" }
            alt={liked ? "thumbs up full" : "thumbs up empty"}
            onClick={() => {setLiked(prev => !prev)}}
            />
            <span>{liked ? snippet.likes + 1 : snippet.likes}</span>
      </div>
    </div>
  )
}

export default SnippetIndividual

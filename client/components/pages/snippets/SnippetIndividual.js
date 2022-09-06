import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import LikeButton from '../../LikeButtons'

const SnippetIndividual = ({snippet}) => {

  const [liked, setLiked] = useState(false)

  return (
    <>
      <div className='snippets-row'>
        <div className='snippets-row-1'>
          <Link
            to={`/codeSnips/single/${snippet.id}`}
            state={{snippet: snippet}}
          >{snippet.name}</Link>
          <LikeButton classNames={['snippets-row-3', 'hide-over-600']} state={liked} setter={setLiked} counter={snippet.likes} />
        </div>
        <p className='snippets-row-2'>{snippet.description}</p>
        <LikeButton classNames={['snippets-row-3', 'hide-under-600']} state={liked} setter={setLiked} counter={snippet.likes} />
      </div>
      <hr className='snippets-divider hide-under-600'/>
    </>
  )
}

export default SnippetIndividual

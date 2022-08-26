import React from 'react'
import { Link } from 'react-router-dom'

const SnippetIndividual = ({snippet}) => {

  return (
    <div className='snippets-row'>
      <Link to={snippet.linkToPage}>{snippet.name}</Link>
      <p>{snippet.description}</p>
      <div>
        <button>
          LIKE
        </button>
        <span>{snippet.likes}</span>
      </div>
    </div>
  )
}

export default SnippetIndividual

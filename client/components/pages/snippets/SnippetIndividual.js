import React from 'react'
import { Link } from 'react-router-dom'

const SnippetIndividual = ({snippet}) => {

  return (
    <div className='snippets-row'>
      <Link className='snippets-row-1' to={snippet.linkToPage}>{snippet.name}</Link>
      <p className='snippets-row-2'>{snippet.description}</p>
      <div className='snippets-row-3'>
        <button>
          LIKE
        </button>
        <span>{snippet.likes}</span>
      </div>
    </div>
  )
}

export default SnippetIndividual

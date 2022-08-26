import React, {useState, useEffect} from 'react'
import { fetchEffect } from '../../../axios/fetchEffect'
import SnippetIndividual from './SnippetIndividual'
import { Outlet } from 'react-router-dom'

const SnippetsIndex = () => {

  const [error, setError] = useState(null)
  const [snippets, setSnippets] = useState([])

  useEffect(() => {
    fetchEffect(
      [setSnippets, setError],
      'get',
      '/api/snippets'
    )
  }, [])

  return (
    <div className='snippets-index'>
      <div className='snippets__h'>
        <h3>Code Snippets</h3>
        <h4>A couple samples I put a little extra love into</h4>
      </div>
      <div className='snippets-container'>
        <div className='snippets-header snippets-row'>
          <span className='snippets-row-1'>NAME</span>
          <span className='snippets-row-2'>DESCRIPTION</span>
          <span className='snippets-row-3'>LIKES</span>
        </div>
        {snippets.length === 0 && <div>We are having trouble retrieving that information</div>}
        {snippets.map(snippet => (
          <SnippetIndividual key={snippet.id} snippet={snippet} />
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default SnippetsIndex

import React, {useState, useEffect} from 'react'
import { fetchEffect } from '../../../axios/fetchEffect'
import SnippetIndividual from './SnippetIndividual'

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
      <h2>Code Snippets</h2>
      <h3>A couple samples I put a little extra love into</h3>
      <div className='snippets-header snippets-row'>
        <span>NAME</span>
        <span>DESCRIPTION</span>
        <span>LIKES</span>
      </div>
      {snippets.length === 0 && <div>We are having trouble retrieving that information</div>}
      {snippets.map(snippet => (
        <SnippetIndividual key={snippet.id} snippet={snippet}/>
      ))}
    </div>
  )
}

export default SnippetsIndex

import React, { useState, useEffect, useContext } from 'react'
import { fetchEffect } from '../../../axios/fetchEffect'
import SnippetIndividual from './SnippetIndividual'
import MeContext from '../../../MeContextProvider'

const SnippetsIndex = () => {

  const [error, setError] = useState(null)
  const [snippets, setSnippets] = useState([])
  const [likedSnips, setLikedSnips] = useState([])
  const { liked } = useContext(MeContext)

  useEffect(() => {
    fetchEffect(
      [setSnippets, setError],
      'get',
      '/api/snippets'
    )
  }, [])

  useEffect(() => {
    console.log('liked form snip index file', liked)
    setLikedSnips(liked)
  }, [liked])

  useEffect(() => {
    console.log('liked Snips ', likedSnips)
  }, [likedSnips])

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
          <SnippetIndividual key={snippet.id}
            snippet={snippet}
            isLiked={likedSnips.includes(snippet.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default SnippetsIndex

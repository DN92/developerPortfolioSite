import React, {useState, useEffect  } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { fetchEffect } from '../../../axios/fetchEffect';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const SnippetIndividualFull = () => {

  const location = useLocation()
  const { snippetId } = useParams()
  console.log(location, ' :location')
  const [error, setError] = useState(null)
  const [snippet, setSnippet] = useState(location.state?.snippet)

  useEffect(() => {
    if(!snippet && snippetId) {
      console.log('no state from history, fetching id: ', snippetId)
      fetchEffect(
        [setSnippet, setError],
        'get',
        `/api/snippets/single?id=${snippetId}`
      )
    }
  }, [])

  useEffect(() => {
    console.log(snippet)
  }, [snippet])

  return  (
    <div className='snips-single'>
      <h4>{snippet.name}</h4>
      { snippet.linkToPage && <a href={snippet.linkToPage} target='_blank'>See the code in work</a> }
      <p className='snips-single-pre'>{snippet?.aboutPre}</p>
      <div className='snips-single__syntax-highlight'>
        <SyntaxHighlighter id='helloWorld'
        language="javascript"
        style={materialDark}
        wrapLongLines={true}>
          {snippet?.codeSnippet}
        </SyntaxHighlighter>
      </div>
      <p className='snips-single-post'>{snippet?.aboutPost}</p>
    </div>
  )

}

export default SnippetIndividualFull

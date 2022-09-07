import React, { useContext } from 'react'
import MeContext from '../MeContextProvider'

const LikeButton = ({classNames, isLiked, snippet}) => {

  const { dispatchLiked } = useContext(MeContext)

  return (
    <div className={classNames.join(' ')}>
      <img className='like-button'
        src={isLiked ? "/pictures/upBlueSelected101.png" : "/pictures/upBnWunselected101.png" }
        alt={isLiked ? "thumbs up filled" : "thumbs up empty"}
        onClick={() => {
          dispatchLiked({
            type: isLiked ? 'removeLike' : 'addLike',
            snippetId: snippet.id,
          })
        }}
      />
      <span>{isLiked ? snippet.likes + 1 : snippet.likes}</span>
    </div>
  )
}

export default LikeButton

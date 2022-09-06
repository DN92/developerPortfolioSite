import React from 'react'

const LikeButton = ({classNames, state, setter, counter}) => {

  console.log('classes: ' , classNames.join(' '))

  return (
    <div className={classNames.join(' ')}>
      <img className='like-button'
        src={state ? "/pictures/upBlueSelected101.png" : "/pictures/upBnWunselected101.png" }
        alt={state ? "thumbs up filled" : "thumbs up empty"}
        onClick={() => {setter(prev => !prev)}}
      />
      <span>{state ? counter + 1 : counter}</span>
    </div>
  )
}

export default LikeButton

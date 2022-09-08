import React, { useState, useMemo, useRef, useEffect } from 'react'
import useMousePosition from '../../customHooks/useMousePosition'
import useWindowDimensions from '../../customHooks/useWindowDimensions'

const EyeBall = () => {

  const initialAnimationSpeed = 1.5
  const defaultAnimationSpeed = 0.3
  const halfAnimationSpeed = 0.6
  const eyeLidTop = useRef()
  const eyeLidBottom = useRef()
  const blinker = useRef()
  const [eyeLidOffset, setEyeLidOffset] = useState(0)
  const {x: mouseX, y: mouseY} = useMousePosition()
  const { width, height } = useWindowDimensions()
  const animationSpeed = useRef(initialAnimationSpeed)  // seconds
  const eyeballPositionProvider = useMemo(() => ({
    transform: `translate(-${mouseX})`,
    left: mouseX * 100 / width + '%',
    top: mouseY * 100 / height + '%',
  }), [mouseX, mouseY, width, height])

  const setEyeLidsOpen = () => {
    setEyeLidOffset(120)
  }

  const setEyeLidsClosed = () => {
    setEyeLidOffset(0)
  }

  const blink = () => {
    animationSpeed.current = defaultAnimationSpeed
    setEyeLidsClosed()
    waitForAnimation(setEyeLidsOpen)
  }

  const eyeLidsHalf = () => {
    animationSpeed.current = halfAnimationSpeed
    setEyeLidOffset(60)
    animationSpeed.current = defaultAnimationSpeed
  }

  const waitForAnimation = (callback) => {
    new Promise(resolve => setTimeout(resolve, animationSpeed.current * 1000)).then(callback)
  }

  const startBlinking = (milliseconds = 6000) => {
    const blinking = setInterval(() => {
      blink()
    }, milliseconds)
    return blinking
  }

  const stopBlinking = () => {
    clearInterval(blinker.current)
  }

  const handleEyeball = (event) => {
    if(event.detail === 2)  {
      stopBlinking()
    } else {
      blink()
    }
  }

  useEffect(() => {
    setEyeLidsOpen()
    waitForAnimation(blink)
    blinker.current = startBlinking(2000)
    return () => {clearInterval(blinker.current)}
  }, [])

  return(
    <div className='eyeball-wrapper wide-height-only'
      onClick={handleEyeball}
      >
      <div className='eyeball-lid-wrapper'>
        <div className='eyeball-lid-top-wrapper' ref={eyeLidTop} style={{
          transform: `translateY(-${eyeLidOffset}%)`,
          transition: `transform ${animationSpeed.current}s ease-in-out`,
        }}>
          <div className='eyeball-lid-top'></div>
        </div>
        <div className='eyeball-lid-bottom-wrapper' ref={eyeLidBottom} style={{
          transform: `translateY(${eyeLidOffset}%)`,
          transition: `transform ${animationSpeed.current}s ease-in-out`,
        }}>
          <div className='eyeball-lid-bottom'></div>
        </div>
      </div>

      <div className='eyeball-outer-iris' style={
        eyeballPositionProvider
      }>
          <div className='eyeball-inner-iris'>

          </div>
      </div>

    </div>
  )
}

export default EyeBall

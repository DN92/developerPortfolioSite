import React, { useState, useMemo, useRef, useEffect } from 'react'
import useMousePosition from '../../customHooks/useMousePosition'
import useWindowDimensions from '../../customHooks/useWindowDimensions'

const EyeBall = () => {

  const initialAnimationSpeed = 1.5
  const defaultAnimationSpeed = 0.3
  const halfAnimationSpeed = 0.9
  const eyeLidTop = useRef()
  const eyeLidBottom = useRef()
  const eyeballWrapper = useRef()
  const blinker = useRef()
  const myCounter = useRef(0)
  const [isBlinking, setIsBlinking] = useState(true)
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

  const eyeLidsHalf = () => {
    animationSpeed.current = halfAnimationSpeed
    setEyeLidOffset(30)
    animationSpeed.current = defaultAnimationSpeed
  }

  const blink = () => {
    animationSpeed.current = defaultAnimationSpeed
    setEyeLidsClosed()
    waitForAnimation(setEyeLidsOpen)
  }

  const halfBlink = () => {
    eyeLidsHalf()
    waitForAnimation(setEyeLidsOpen)
  }

  const eyeballExamine = () => {
    setEyeLidOffset(35)
    new Promise(resolve => setTimeout(resolve, 3000)).then(setEyeLidsOpen)
  }

  const waitForAnimation = (callback) => {
    new Promise(resolve => setTimeout(resolve, animationSpeed.current * 1000)).then(callback)
  }

  const startBlinking = (milliseconds = 3000) => {
    setIsBlinking(true)
    blink()
    clearInterval(blinker.current)
    blinker.current = setInterval(() => {
      console.log('blink')
      blink()
    }, milliseconds)
  }

  const stopBlinking = () => {
    setIsBlinking(false)
    clearInterval(blinker.current)
    waitForAnimation(setEyeLidsClosed());
  }

  const handleEyeball = (event) => {
    if(isBlinking) {
      if(event.detail > 1)  {
        stopBlinking()
      }
    } else {
      if(event.detail > 1) {
        startBlinking()
      }
    }
  }

  useEffect(() => {
    setEyeLidsOpen()
    waitForAnimation(startBlinking)
    return () => {clearInterval(blinker.current)}
  }, [])

  return(
    <div className='eyeball-wrapper wide-height-only'
      ref={eyeballWrapper}
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
          <div className='eyeball-inner-iris'></div>
      </div>

    </div>
  )
}

export default EyeBall

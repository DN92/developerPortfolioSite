import React, {useMemo, useEffect} from 'react'
import useWindowSize from '../customHooks/useWindowSize'

//  the options prop default shows the shape of the options obj but the defaulted values should not be used and are set to low values to visually indicate a problem.
//  Options object will be ignored (other than the useDefault value itself) unless useDefault is set to false (or falsy)
{
  useDefault: true
}

const IFrameWrapper = ({
  classNames = [],
  src,
  style,
  title = "",
  options = {
    useDefault: true,
    dimension: {
      height: '70px',
      width: '40px'
    }
  }
}) => {

  const windowSize = useWindowSize()

  const sizeForIframe = useMemo(() => {

    if(windowSize.width <= 600) {
      return {
        width: windowSize.width,
        height: windowSize.width * 9 / 16
      }
    }

    if(!options.useDefault) {
      return {
        width: options.width,
        height: options.height,
      }
    }

    if(windowSize.width >= 1200) {
      return {
        width: '900',
        height: '506',
      }
    }

    if(windowSize.width >= 1000) {
      return {
        width: '700',
        height: '394',
      }
    }
    if(windowSize.width >= 800) {
      return {
        width: '600',
        height: '338',
      }
    }
    if(windowSize.width >= 600) {
      return {
        width: '500'
  ,     height: '281',
      }
    }

  }, [windowSize])

  //  another visual indicator is src was not provided
  if(!src) {
    return (
      <div>
        <p className='red'>No I Frame Source was provided</p>
        <p className='red'>No I Frame Source was provided</p>
        <p className='red'>No I Frame Source was provided</p>
      </div>
    )
  }

  return (
    <div className={[classNames.join(' ') + ' ' + 'iframe-wrapper']} style={style}>
      <iframe
        src={src}
        height={sizeForIframe.height}
        width={sizeForIframe.width}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture allowfullscreen"
        title={title}
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export default IFrameWrapper

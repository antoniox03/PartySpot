import React, { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import "../../static/css/Room.css"

const AnimatedSquare = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const toggleFullScreen = () => setFullScreen(prevState => !prevState)

  return (
    <Flipper flipKey={fullScreen}>
      <Flipped flipId="square">
        <div
          className={fullScreen ? 'full-screen-square' : 'square'}
          onClick={toggleFullScreen}
        />
      </Flipped>
    </Flipper>
  )
}

export default AnimatedSquare;
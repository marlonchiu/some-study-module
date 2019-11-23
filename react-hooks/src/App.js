import React from 'react'
import './App.css'
import LikeButton from './components/LikeButton'
// import MouseTracker from './components/MouseTracker'
import DogShow from './components/DogShow'
import useMousePosition from './hooks/useMousePosition'

function App() {
  const position = useMousePosition()
  return (
    <div className='App'>
      <header className='App-header'>
        <h>鼠标位置：{position.x} ; {position.y}</h>
        <DogShow />
        <LikeButton />
        {/* <MouseTracker /> */}
      </header>
    </div>
  )
}

export default App

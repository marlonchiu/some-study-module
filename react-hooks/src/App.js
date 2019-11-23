import React from 'react'
import './App.css'
import LikeButton from './components/LikeButton'
// import MouseTracker from './components/MouseTracker'
import DogShow from './components/DogShow'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <DogShow />
        <LikeButton />
        {/* <MouseTracker /> */}
      </header>
    </div>
  )
}

export default App

import React, { useState } from 'react'
import './App.css'
import LikeButton from './components/LikeButton'
// import withLoader from './components/withLoader'
// import MouseTracker from './components/MouseTracker'
// import DogShow from './components/DogShow'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
// 高阶组件
// const DogShow = ({ isLoading, data }) => {
//   const style = {
//     width: 200
//   }
//   return (
//     <>
//       {
//         isLoading ? <p>狗狗图片读取中...</p>
//           : <img src={data.message} alt='dog' style={style} />
//       }
//     </>
//   )
// }
const style = {
  width: 200
}
const CatShowWithHook = () => {
  const [category, setCategory] = useState('1')
  const [data, loading] = useURLLoader(`https://api.thecatapi.com/v1/images/search?limit=1&category=${category}`)
  return (
    <>
      {
        loading ? <p>猫猫图片读取中...</p>
          : <img src={data && data[0].url} alt='cat' style={style} />
      }
      <button onClick={() => { setCategory('1') }}>帽子</button>
      <button onClick={() => { setCategory('5') }}>盒子</button>
    </>
  )
}

const DogShowWithHook = () => {
  const [data, loading] = useURLLoader('https://dog.ceo/api/breeds/image/random')
  return (
    <>
      {
        loading ? <p>狗狗图片读取中...</p>
          : <img src={data && data.message} alt='dog' style={style} />
      }
    </>
  )
}
function App () {
  const position = useMousePosition()
  // const DogShowWithLoader = withLoader(DogShow, 'https://dog.ceo/api/breeds/image/random')
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>鼠标位置：{position.x} ; {position.y}</h1>
        {/* <DogShow /> */}
        <DogShowWithHook />
        <CatShowWithHook />
        {/* <DogShowWithLoader /> */}
        <LikeButton />
        {/* <MouseTracker /> */}
      </header>
    </div>
  )
}

export default App

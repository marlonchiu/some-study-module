import React, { useState, useEffect } from 'react'

// 约定函数必须以 use 开头
// 多个组件之间的state 是完全隔离的
const useMousePosition = () => {
  const [positions, setPositions] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMouse = (event) => {
      setPositions({ x: event.clientX, y: event.clientY })
    }
    document.addEventListener('mousemove', updateMouse)

    return () => {
      // 组件卸载清除
      document.removeEventListener('mousemove', updateMouse)
    }
  })

  return positions
}

export default useMousePosition

import { useState, useEffect, useContext } from 'react'
import { dashboardContext } from '../providers/DashboardProvider';

export default function ProgressBar({ playLengthArray, isPlaying, hardMode, hardModeArray }) {
  const [width, setWidth] = useState(0);
  const { song } = useContext(dashboardContext)

  function calculateIncrement(playLengthArray) {
    return (100 / (playLengthArray[playLengthArray.length - 1] / 5))
  }

  useEffect(() => {
    if (!isPlaying) return
    setWidth(0)
    const timer = setInterval(set, 5)
    function set() {
      setWidth(prev => {
        if (prev < 100) {
          return prev + (hardMode ? calculateIncrement(hardModeArray) : calculateIncrement(playLengthArray))
        }
        else {
          clearInterval(timer)
        }
      })
    }
    return () => {
      clearInterval(timer)
    }

  }, [isPlaying])

  useEffect(() => {
    setWidth(0)
  }, [song])


  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: `10px`
  }

  const fillerStyles = {
    height: '100%',
    width: `${width}% `,
    backgroundColor: "#1976d2",
    borderRadius: 'inherit',
    textAlign: 'right'
  }
  return (
    <div className="progress-parent" style={containerStyles}>
      <div className="progress-child" style={fillerStyles} ></div>
    </div>
  )
}

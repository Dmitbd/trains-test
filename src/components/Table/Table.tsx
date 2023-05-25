import { useEffect, useState } from "react"
import axios from "axios"
import { Train } from "./types"
import TrainContainer from "../TrainContainer/TrainContainer"

const getTrains = 'https://gist.githubusercontent.com/GlennMiller1991/152583a1bf1e057e8db06f5949ae3dda/raw/f84adf51092706ae0e7c0abc7589ad49800d8112/trains.json'


const Table = () => {
  const [trains, setTrains] = useState<Train[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    axios
      .get(getTrains)
      .then((response) => {
        setTrains(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  const compareSpeedLimits = (a: any, b: any) => {
    const speedLimitA = a.speedLimit
    const speedLimitB = b.speedLimit

    if (speedLimitA < speedLimitB) {
      return -1
    }
    if (speedLimitA > speedLimitB) {
      return 1
    }
    return 0
  }

  const newTrains = trains.map((train, index) => ({
    ...train,
    name: `${index + 1}`,
    speedLimits: train.speedLimits
      .sort(compareSpeedLimits)
      .map((item, index) => ({
        ...item,
        name: `${index + 1}`
      }))
  }))

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>{
          newTrains.map((train) => {
            return (
              <TrainContainer key={Math.random()} train={train} />
            )
          })
        }</div>
      )}
    </div>
  )
}

export default Table

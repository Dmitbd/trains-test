import { useState } from "react"
import LimitInput from "../LimitInput/LimitInput"
import { Train } from "../Table/types"

type TrainProps = {
  train: Train
}

const TrainContainer = ({ train }: TrainProps) => {
  const [isValid, setValid] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const [trainForm, setTrainForm] = useState<Train>({
    name: train.name,
    description: train.description,
    speedLimits: train.speedLimits,
  })

  const inputValidator = (baseNumber: number, number: number) => {
    if (baseNumber !== number && number !== 0) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  const handleSpeedLimitChange = (index: number, value: number) => {
    setTrainForm((prevTrainForm) => {
      const updatedSpeedLimits = [...prevTrainForm.speedLimits]
      updatedSpeedLimits[index] = { ...updatedSpeedLimits[index], speedLimit: value }
      return { ...prevTrainForm, speedLimits: updatedSpeedLimits }
    })
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleSubmitForm = async () => {
    setLoading(true)
    try {
      // Имитация асинхронной отправки формы
      await delay(1000)

      const isSuccess = true

      if (isSuccess) {
        const sortedSpeedLimits = [...trainForm.speedLimits].sort(
          (a, b) => a.speedLimit - b.speedLimit
        )

        const sortedTrainForm = {
          ...trainForm,
          name: `Поезд №${Number(train.name) - 1}`,
          speedLimits: sortedSpeedLimits.map((limit, index) => ({
            ...limit,
            name: `Скорость №${index}`,
          })),
        }

        console.log("Форма успешно отправлена")
        console.log(sortedTrainForm)
      } else {
        console.log("Ошибка при отправке формы")
      }
    } catch (error) {
      console.log("Произошла ошибка", error)
    } finally {
      setLoading(false)
      setValid(false)
    }
    // после успешной отправки сделать повторный get запрос для обновленния данных, при необходимости
  }

  return (
    <div style={{ display: "flex",justifyContent: 'space-between', margin: '10px auto', border: '1px solid black', padding: '10px', width: '500px' }}>

      <p style={{ fontWeight: 'bold', width: '100px' }}>Поезд {train.name}</p>

      <div>
        {train.speedLimits.map((limits, index) => (
          <div key={index} style={{ display: "flex" }}>
            <p style={{ width: '100px' }}>Скорость {limits.name}</p>

            <LimitInput
              limitValue={limits.speedLimit}
              inputValidator={(baseNumber, number) => {
                inputValidator(baseNumber, number)
                handleSpeedLimitChange(index, number)
              }}
            />
          </div>
        ))}
      </div>

      <button disabled={!isValid} onClick={handleSubmitForm} style={{ width: '130px', height: '40px' }}>
        {isLoading ? 'Отправка...' : 'Отправить'}
      </button>

    </div>
  )
}

export default TrainContainer

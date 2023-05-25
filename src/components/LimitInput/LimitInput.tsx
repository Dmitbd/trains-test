import { useState, useEffect } from "react"

type LimitInputProps = {
  limitValue: number
  inputValidator: (baseNumber: number, number: number) => void
}

const LimitInput = ({ limitValue, inputValidator }: LimitInputProps) => {
  const [number, setNumber] = useState<number>(limitValue)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || (/^\d+$/.test(value) && Number(value) > 0)) {
      setNumber(Number(value))
    }
  }

  useEffect(() => {
    inputValidator(limitValue, number)
  }, [number])

  return (
    <input
      value={number}
      onChange={handleInputChange}
      type="text"
      pattern="\d*"
      style={{width: '100px', height: '40px'}}
    />
  )
}

export default LimitInput

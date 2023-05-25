export type Train = {
  name: string
  description: string
  speedLimits: SpeedLimit[]
}

type SpeedLimit = {
  name: string
  speedLimit: number
}
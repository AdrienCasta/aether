type LifeFragmentEntity = {
  id: string
  description: string
  type: "emotion" | "thought" | "event" | "action"
  date?: string
  intensity?: number
  tags?: string[]
}

export default LifeFragmentEntity

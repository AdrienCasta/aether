type LifeFragmentEntity = {
  id: string
  text: string
  type: "emotion" | "thought" | "event" | "action"
  date?: string
  intensity?: number
  tags?: string[]
}

export default LifeFragmentEntity

type RecordLifeFragmentcommand = {
  text: string
  type: "emotion" | "thought" | "event" | "action"
  date?: Date
  intensity?: number
  tags?: string[]
}

export default RecordLifeFragmentcommand

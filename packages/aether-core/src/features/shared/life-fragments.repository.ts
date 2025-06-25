import RecordLifeFragmentcommand from "../record-life-fragment/record-life-fragment.command"

export default interface LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void>
}

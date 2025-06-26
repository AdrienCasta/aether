import RecordLifeFragmentcommand from "../record-life-fragment/record-life-fragment.command"
import LifeFragmentEntity from "./life-fragment.entity"

export default interface LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void>
  findAll(): Promise<LifeFragmentEntity[]>
}

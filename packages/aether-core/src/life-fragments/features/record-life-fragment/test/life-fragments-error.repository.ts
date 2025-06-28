import RecordLifeFragmentcommand from "../record-life-fragment.command"
import LifeFragmentEntity from "../../shared/life-fragment.entity"
import LifeFragmentsRepository from "../../shared/life-fragments.repository"

class LifeFragmentsErrorRepositoryFake implements LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void> {
    throw new Error()
  }
  findAll(): Promise<LifeFragmentEntity[]> {
    throw new Error()
  }
}

export default LifeFragmentsErrorRepositoryFake

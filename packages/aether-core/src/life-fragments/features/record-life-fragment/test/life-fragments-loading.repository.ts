import RecordLifeFragmentcommand from "../record-life-fragment.command"
import LifeFragmentEntity from "../../shared/life-fragment.entity"
import LifeFragmentsRepository from "../../shared/life-fragments.repository"

class LifeFragmentsLoadingRepositoryFake implements LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void> {
    return new Promise(() => {})
  }
  findAll(): Promise<LifeFragmentEntity[]> {
    return new Promise(() => {})
  }
}

export default LifeFragmentsLoadingRepositoryFake

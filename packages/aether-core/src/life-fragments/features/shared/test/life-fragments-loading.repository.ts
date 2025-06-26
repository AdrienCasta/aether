import LifeFragmentsRepository from "../life-fragments.repository"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentEntity from "../life-fragment.entity"

class LifeFragmentsLoadingRepositoryFake implements LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void> {
    return new Promise(() => {})
  }
  findAll(): Promise<LifeFragmentEntity[]> {
    return new Promise(() => {})
  }
}

export default LifeFragmentsLoadingRepositoryFake

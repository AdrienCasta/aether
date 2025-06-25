import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentsRepository from "../../shared/life-fragments.repository"

class LifeFragmentsLoadingRepositoryFake implements LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void> {
    return new Promise(() => {})
  }
}

export default LifeFragmentsLoadingRepositoryFake

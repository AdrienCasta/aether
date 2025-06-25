import LifeFragmentsRepository from "../life-fragments.repository"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"

class LifeFragmentsLoadingRepositoryFake implements LifeFragmentsRepository {
  save(_: RecordLifeFragmentcommand): Promise<void> {
    return new Promise(() => {})
  }
}

export default LifeFragmentsLoadingRepositoryFake

import { randomUUID } from "node:crypto"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentsRepository from "../../shared/life-fragments.repository"
import LifeFragmentModel from "../../shared/life-fragment.model"

class LifeFragmentsSuccessRepositoryFake implements LifeFragmentsRepository {
  private lifeFragments: LifeFragmentModel[] = []
  async save(
    recordLifeFragmentCommand: RecordLifeFragmentcommand,
  ): Promise<void> {
    this.lifeFragments.push({
      id: randomUUID(),
      ...recordLifeFragmentCommand,
    })
  }
}

export default LifeFragmentsSuccessRepositoryFake

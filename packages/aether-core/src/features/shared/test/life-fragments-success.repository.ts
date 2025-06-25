import { randomUUID } from "node:crypto"
import LifeFragmentsRepository from "../life-fragments.repository"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentModel from "../life-fragment.model"

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

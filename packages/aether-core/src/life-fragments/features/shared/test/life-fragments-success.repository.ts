import { randomUUID } from "node:crypto"
import LifeFragmentsRepository from "../life-fragments.repository"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentEntity from "../life-fragment.entity"

class LifeFragmentsSuccessRepositoryFake implements LifeFragmentsRepository {
  private lifeFragments: LifeFragmentEntity[] = []

  async findAll(): Promise<LifeFragmentEntity[]> {
    return this.lifeFragments
  }
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

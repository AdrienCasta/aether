import { randomUUID } from "node:crypto"
import RecordLifeFragmentcommand from "../record-life-fragment.command"
import LifeFragmentsRepository from "../../shared/life-fragments.repository"
import LifeFragmentEntity from "../../shared/life-fragment.entity"

class LifeFragmentsSuccessRepositoryFake implements LifeFragmentsRepository {
  private lifeFragments: LifeFragmentEntity[] = []
  async save(
    recordLifeFragmentCommand: RecordLifeFragmentcommand,
  ): Promise<void> {
    this.lifeFragments.push({
      id: randomUUID(),
      ...recordLifeFragmentCommand,
    })
  }
  async findAll(): Promise<LifeFragmentEntity[]> {
    return this.lifeFragments
  }
}

export default LifeFragmentsSuccessRepositoryFake

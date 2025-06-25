import { randomUUID } from "node:crypto"
import RecordLifeFragmentcommand from "../../record-life-fragment/record-life-fragment.command"
import LifeFragmentModel from "../life-fragment.model"
import LifeFragmentsRepository from "../life-fragments.repository"

class LifeFragmentsInMemoryRepository implements LifeFragmentsRepository {
  private lifeFragments: LifeFragmentModel[] = []
  async save(recordLifeFragmentCommand: RecordLifeFragmentcommand) {
    this.lifeFragments.push({
      id: randomUUID(),
      ...recordLifeFragmentCommand,
    })
  }
}

export default LifeFragmentsInMemoryRepository

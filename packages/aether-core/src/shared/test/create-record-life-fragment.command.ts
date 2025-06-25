import { faker } from "@faker-js/faker"
import RecordLifeFragmentcommand from "../../features/record-life-fragment/record-life-fragment.command"

const createRecordLifeFragmentCommand = (
  recordLifeFragmentCommand?: Partial<RecordLifeFragmentcommand>,
): RecordLifeFragmentcommand => {
  return {
    text: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(["emotion", "thought", "action", "event"]),
    date: faker.helpers.maybe(() => faker.date.recent()),
    intensity: faker.helpers.maybe(() =>
      faker.helpers.rangeToNumber({ min: 1, max: 10 }),
    ),
    tags: faker.helpers.maybe(() =>
      faker.helpers.arrayElements(["anxiety", "work", "motivation"]),
    ),
    ...recordLifeFragmentCommand,
  }
}

export default createRecordLifeFragmentCommand

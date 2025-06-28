import createRecordLifeFragmentCommand from "../../../shared/test/create-record-life-fragment.command"
import createTestStore from "../../../shared/test/create-test-store"
import {
  getLifeFragmentsListData,
  lifeFragmentsLoaded,
  lifeFragmentsStartLoaded,
} from "../list-life-fragments/list-life-fragments.reducer"
import RecordLifeFragmentCommand from "./record-life-fragment.command"
import {
  getLifeFragmentRecordError,
  getLifeFragmentRecordStatus,
  lifeFragmentRecorded,
  lifeFragmentRecordFailed,
  lifeFragmentRecordStarted,
} from "./record-life-fragment.reducer"
import { Action, Dispatch, Store } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"

import LifeFragmentsLoadingRepositoryFake from "../shared/test/life-fragments-loading.repository"
import LifeFragmentsSuccessRepositoryFake from "../shared/test/life-fragments-success.repository"
import { Container, RootState } from "../../../shared/application/root.store"
import { getNotificationList } from "../../../app/notifications/features/add-notification/add-notification.reducer"
import LifeFragmentsErrorRepositoryFake from "./test/life-fragments-error.repository"
import ApplicationError from "../../../shared/application/application-error"
import { InfrastructureError } from "../../../shared/infrastructure/infrastructure-error"

describe("As a user, I want to record a life fragment", () => {
  describe("Given no life fragment is already recorded", () => {
    let store: Store

    beforeEach(() => {
      store = createTestStore()
    })

    test("Then the status should be idle", () => {
      expect(getLifeFragmentRecordStatus(store.getState())).toBe("idle")
    })
    test("Then there should be no error", () => {
      expect(getLifeFragmentRecordError(store.getState())).toBeNull()
    })
    test("Then no life fragments exist", () => {
      expect(getLifeFragmentsListData(store.getState()).length).toBe(0)
    })
  })

  describe("Given no life fragment is already recorded", () => {
    let store: Store

    beforeEach(() => {
      store = createTestStore()
    })

    describe("When life fragment recording start", () => {
      beforeEach(() => {
        recordLifeFragmentUsecase(createRecordLifeFragmentCommand())(
          store.dispatch,
          store.getState,
          { lifeFragmentsRepository: new LifeFragmentsLoadingRepositoryFake() },
        )
      })
      test("Then the status should be loading", () => {
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("loading")
      })

      test("Then there should be no error", () => {
        expect(getLifeFragmentRecordError(store.getState())).toBeNull()
      })

      test("Then no life fragment still exist", () => {
        expect(getLifeFragmentsListData(store.getState()).length).toBe(0)
      })
    })
  })

  describe("Given no life fragment is already recorded", () => {
    let store: Store
    let recordLifeFragmentCommand: RecordLifeFragmentCommand

    describe("When life fragment is successfully recorded", () => {
      beforeAll(() => {
        recordLifeFragmentCommand = createRecordLifeFragmentCommand()
        store = createTestStore()
        recordLifeFragmentUsecase(recordLifeFragmentCommand)(
          store.dispatch,
          store.getState,
          { lifeFragmentsRepository: new LifeFragmentsSuccessRepositoryFake() },
        )
      })
      test("Then the status should be in success", () => {
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("success")
      })
      test("Then there should be no error", () => {
        expect(getLifeFragmentRecordError(store.getState())).toBeNull()
      })
      test("Then we are notify", () => {
        expect(getNotificationList(store.getState())[0].message).toBeDefined()
      })
      test("Then the fragment is listed", () => {
        expect(
          getLifeFragmentsListData(store.getState())[0].description,
        ).toEqual(recordLifeFragmentCommand.description)
      })
    })
  })

  describe("Given no life fragment is already recorded", () => {
    let store: Store
    let recordLifeFragmentCommand: RecordLifeFragmentCommand

    describe("When life fragment failed to be recorded (server)", () => {
      beforeAll(() => {
        recordLifeFragmentCommand = createRecordLifeFragmentCommand()
        store = createTestStore()
        recordLifeFragmentUsecase(recordLifeFragmentCommand)(
          store.dispatch,
          store.getState,
          { lifeFragmentsRepository: new LifeFragmentsErrorRepositoryFake() },
        )
      })
      test("Then the status should be in error", () => {
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("error")
      })
      test("Then we are notified", () => {
        expect(getNotificationList(store.getState())[0].type).toBe("error")
      })
      test("Then no life fragments exist", () => {
        expect(getLifeFragmentsListData(store.getState()).length).toBe(0)
      })
    })
  })

  describe("Given no life fragment is already recorded", () => {
    let store: Store
    let recordLifeFragmentCommand: RecordLifeFragmentCommand

    describe("When life fragment failed to be recorded because of a too short description", () => {
      beforeAll(() => {
        recordLifeFragmentCommand = createRecordLifeFragmentCommand({
          description: "",
        })
        store = createTestStore()
        recordLifeFragmentUsecase(recordLifeFragmentCommand)(
          store.dispatch,
          store.getState,
          { lifeFragmentsRepository: new LifeFragmentsSuccessRepositoryFake() },
        )
      })
      test("Then the status should be in error", () => {
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("error")
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("error")
      })
    })
  })
})

export type Thunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  Container,
  Action
>

function recordLifeFragmentUsecase(
  recordLifeFragmentCommand: RecordLifeFragmentCommand,
): Thunk {
  return async (dispatch: Dispatch, _, { lifeFragmentsRepository }) => {
    dispatch(lifeFragmentRecordStarted())

    try {
      guardAgainstTooShortDescription(recordLifeFragmentCommand)
    } catch (error) {
      dispatch(
        lifeFragmentRecordFailed({
          name: (error as ApplicationError).name,
          message: (error as ApplicationError).message,
        }),
      )
      return
    }

    try {
      await lifeFragmentsRepository.save(recordLifeFragmentCommand)

      dispatch(lifeFragmentRecorded())

      dispatch(lifeFragmentsStartLoaded())

      const lifeFragments = await lifeFragmentsRepository.findAll()

      dispatch(lifeFragmentsLoaded(lifeFragments))
    } catch (error) {
      dispatch(
        lifeFragmentRecordFailed({
          name: (error as InfrastructureError).name,
          message: (error as InfrastructureError).message,
        }),
      )
    }
  }
}

function guardAgainstTooShortDescription({
  description,
}: RecordLifeFragmentCommand) {
  if (description.length < 1) {
    throw new DescriptionTooShortError()
  }
}

export class RecordLifeFragmentError extends InfrastructureError {
  constructor() {
    super("Life fragment failed to be recorded")
  }
}

export class DescriptionTooShortError extends ApplicationError {
  constructor() {
    super(`Life fragment description is too short`)
  }
}

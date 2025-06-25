import createRecordLifeFragmentCommand from "../../shared/test/create-record-life-fragment.command"
import createTestStore from "../../shared/test/create-test-store"
import { getLifeFragmentListData } from "../list-life-fragment/list-life-fragments.reducer"
import RecordLifeFragmentCommand from "./record-life-fragment.command"
import {
  getLifeFragmentRecordError,
  getLifeFragmentRecordStatus,
  lifeFragmentRecorded,
  lifeFragmentRecordStarted,
} from "./record-life-fragment.reducer"
import { Action, Dispatch, Store } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk"

import LifeFragmentsLoadingRepositoryFake from "../shared/test/life-fragments-loading.repository"
import LifeFragmentsSuccessRepositoryFake from "../shared/test/life-fragments-success.repository"
import { Container, RootState } from "../../shared/application/root.store"

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
      expect(getLifeFragmentListData(store.getState()).length).toBe(0)
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
        expect(getLifeFragmentListData(store.getState()).length).toBe(0)
      })
    })
  })

  describe("Given no life fragment is already recorded", () => {
    let store: Store

    beforeEach(() => {
      store = createTestStore()
    })

    describe("When life fragment is successfully recorded", () => {
      beforeEach(() => {
        recordLifeFragmentUsecase(createRecordLifeFragmentCommand())(
          store.dispatch,
          store.getState,
          { lifeFragmentsRepository: new LifeFragmentsSuccessRepositoryFake() },
        )
      })
      test("Then the status should be in success", () => {
        expect(getLifeFragmentRecordStatus(store.getState())).toBe("success")
      })
    })
  })
})

// type ThunkUsecase<T> = ThunkAction<void, RootState, T, any>
export type Thunk<ReturnType = Promise<void>> = ThunkAction<
  ReturnType,
  RootState,
  Container,
  Action
>

function recordLifeFragmentUsecase(
  recordLifeFragmentcommand: RecordLifeFragmentCommand,
): Thunk {
  return async (dispatch: Dispatch, _, { lifeFragmentsRepository }) => {
    dispatch(lifeFragmentRecordStarted())

    await lifeFragmentsRepository.save(recordLifeFragmentcommand)

    dispatch(lifeFragmentRecorded())
  }
}

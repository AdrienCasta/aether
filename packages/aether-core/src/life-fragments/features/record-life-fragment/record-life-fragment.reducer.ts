import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootState } from "../../../shared/application/root.store"
import ApplicationError from "../../../shared/application/application-error"
import { InfrastructureError } from "../../../shared/infrastructure/infrastructure-error"

type LifeFragmentStateModel = {
  status: "idle" | "loading" | "success" | "error"
  error: {
    type: ApplicationError["name"] | InfrastructureError["name"]
    message: string
  } | null
}

export const lifeFragmentRecordStarted = createAction(
  "LIFE_FRAGMENT_RECORD_STARTED",
)

export const lifeFragmentRecorded = createAction("LIFE_FRAGMENT_RECORDED")

export const lifeFragmentRecordFailed = createAction<
  ApplicationError | InfrastructureError
>("LIFE_FRAGMENT_RECORD_FAILED")

const recordLifeFragmentInitialState: LifeFragmentStateModel = {
  status: "idle",
  error: null,
}
const recordLifeFragmentReducer = createReducer(
  recordLifeFragmentInitialState,
  builder => {
    builder
      .addCase(lifeFragmentRecordStarted, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(lifeFragmentRecorded, state => {
        state.status = "success"
        state.error = null
      })
      .addCase(lifeFragmentRecordFailed, (state, { payload }) => {
        state.status = "error"
        state.error = {
          type: payload.name,
          message: payload.message,
        }
      })
  },
)

export function getLifeFragmentRecordStatus(state: RootState) {
  return state.lifeFragments.record.status
}
export function getLifeFragmentRecordError(state: RootState) {
  return state.lifeFragments.record.error
}

export default recordLifeFragmentReducer

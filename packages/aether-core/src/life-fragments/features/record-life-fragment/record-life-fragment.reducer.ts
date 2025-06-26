import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootState } from "../../../shared/application/root.store"

type LifeFragmentStateModel = {
  status: "idle" | "loading" | "success"
  error: null
}

export const lifeFragmentRecordStarted = createAction(
  "LIFE_FRAGMENT_RECORD_STARTED",
)

export const lifeFragmentRecorded = createAction("LIFE_FRAGMENT_RECORDED")

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
  },
)

export function getLifeFragmentRecordStatus(state: RootState) {
  return state.lifeFragments.record.status
}
export function getLifeFragmentRecordError(state: RootState) {
  return state.lifeFragments.record.error
}

export default recordLifeFragmentReducer

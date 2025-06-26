import { createAction, createReducer } from "@reduxjs/toolkit"
import { RootState } from "../../../shared/application/root.store"
import LifeFragmentEntity from "../shared/life-fragment.entity"

type ListFragmentsLifeModel = {
  status: "loading" | "idle"
  data: LifeFragmentEntity[]
}

const listLifeFragmentsInitialState: ListFragmentsLifeModel = {
  data: [],
  status: "idle",
}

export const lifeFragmentsStartLoaded = createAction(
  "LIFE_FRAGMENTS_START_LOADED",
)

export const lifeFragmentsLoaded = createAction<LifeFragmentEntity[]>(
  "LIFE_FRAGMENTS_LOADED",
)

const listLifeFragmentsReducer = createReducer<ListFragmentsLifeModel>(
  listLifeFragmentsInitialState,
  builder => {
    builder.addCase(lifeFragmentsStartLoaded, state => {
      state.status = "loading"
    })
    builder.addCase(lifeFragmentsLoaded, (state, { payload }) => {
      state.status = "idle"
      state.data = payload
    })
  },
)

export function getLifeFragmentsListData(state: RootState) {
  return state.lifeFragments.list.data
}
export function getLifeFragmentsListStatus(state: RootState) {
  return state.lifeFragments.list.status
}

export default listLifeFragmentsReducer

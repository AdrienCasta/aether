import { createReducer } from "@reduxjs/toolkit"
import { RootState } from "../../shared/application/root.reducer"

type ListFragmentsLifeModel = {
  data: []
}

const listLifeFragmentsInitialState: ListFragmentsLifeModel = {
  data: [],
}

const listLifeFragmentsReducer = createReducer<ListFragmentsLifeModel>(
  listLifeFragmentsInitialState,
  builder => {},
)

export function getLifeFragmentListData(state: RootState) {
  return state.lifeFragments.list.data
}

export default listLifeFragmentsReducer

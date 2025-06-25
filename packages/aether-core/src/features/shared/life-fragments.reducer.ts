import { combineReducers } from "@reduxjs/toolkit"
import recordLifeFragmentReducer from "../record-life-fragment/record-life-fragment.reducer"
import listLifeFragmentsReducer from "../list-life-fragment/list-life-fragments.reducer"

const lifeFragmentsReducer = combineReducers({
  record: recordLifeFragmentReducer,
  list: listLifeFragmentsReducer,
})

export default lifeFragmentsReducer

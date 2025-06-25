import { combineReducers } from "@reduxjs/toolkit"
import lifeFragmentsReducer from "../../features/shared/life-fragments.reducer"

const rootReducer = combineReducers({
  lifeFragments: lifeFragmentsReducer,
})

export default rootReducer

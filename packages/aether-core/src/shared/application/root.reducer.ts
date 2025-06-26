import { combineReducers } from "@reduxjs/toolkit"
import lifeFragmentsReducer from "../../life-fragments/features/shared/life-fragments.reducer"
import notificationsReducer from "../../app/notifications/features/shared/notifications.reducer"

const rootReducer = combineReducers({
  lifeFragments: lifeFragmentsReducer,
  notifications: notificationsReducer,
})

export default rootReducer

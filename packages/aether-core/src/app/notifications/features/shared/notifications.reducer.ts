import { combineReducers } from "@reduxjs/toolkit"
import addNotificationReducer from "../add-notification/add-notification.reducer"

const notificationsReducer = combineReducers({
  add: addNotificationReducer,
})

export default notificationsReducer

import { createReducer } from "@reduxjs/toolkit"
import {
  lifeFragmentRecorded,
  lifeFragmentRecordFailed,
} from "../../../../life-fragments/features/record-life-fragment/record-life-fragment.reducer"
import { RootState } from "../../../../shared/application/root.store"

type NotificationEntity = {
  type: "success" | "error"
  message: string
}
type AddNotificationModel = {
  list: NotificationEntity[]
}

const addNotificationInitialState: AddNotificationModel = {
  list: [],
}

const addNotificationReducer = createReducer<AddNotificationModel>(
  addNotificationInitialState,
  builder => {
    builder
      .addCase(lifeFragmentRecorded, state => {
        state.list.push({
          type: "success",
          message: "Life Fragment recorded",
        })
      })
      .addCase(lifeFragmentRecordFailed, state => {
        state.list.push({
          type: "error",
          message: "Life Fragment failed to be recorded",
        })
      })
  },
)

export function getNotificationList(state: RootState) {
  return state.notifications.add.list
}

export default addNotificationReducer

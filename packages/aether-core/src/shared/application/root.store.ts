import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./root.reducer"
import LifeFragmentsRepository from "../../features/shared/life-fragments.repository"
import LifeFragmentsInMemoryRepository from "../../features/shared/infrascture/life-fragments.in-memory-repository"

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          lifeFragmentsRepository: new LifeFragmentsInMemoryRepository(),
        },
      },
    }),
})

export default rootStore

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
export type Container = {
  lifeFragmentsRepository: LifeFragmentsRepository
}

import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./root.reducer"
import LifeFragmentsRepository from "../../life-fragments/features/shared/life-fragments.repository"
import LifeFragmentsInMemoryRepository from "../../life-fragments/features/shared/infrastructure/life-fragments.in-memory-repository"

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

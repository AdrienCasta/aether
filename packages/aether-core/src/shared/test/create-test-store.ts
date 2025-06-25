import { configureStore } from "@reduxjs/toolkit"
import rootReducer, { RootState } from "../application/root.reducer"

const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export default createTestStore

import { configureStore } from "@reduxjs/toolkit";
import trailsReducer from "../fetaurs/trailsPages/trailsSlice"
import usersReducer from "../fetaurs/usersPages/usersListSlice"

export const store = configureStore({
    reducer: {
        trails: trailsReducer,
        users: usersReducer,
    }
})


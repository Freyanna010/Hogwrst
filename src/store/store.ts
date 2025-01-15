import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "../features/studentsSlice";

export const store = configureStore({
  reducer: {
    students: studentSlice,
    // favoriteStudents: favoriteStudentsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

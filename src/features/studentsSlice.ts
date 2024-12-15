import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStudentDataById, fetchStudentsData } from "./studentsThunks";
import { Student } from "../types/types";

interface StudentsState {
  allStudents: Student[];
  favoriteStudents: string[];
  filteredStudents: Student[];
  currentStudent: null | Student[];
  studentsLoading: boolean;
  studentsError: null | string;
  studentLoading: boolean;
  studentError: null | string;
}

const initialState: StudentsState = {
  allStudents: [],
  filteredStudents: [],
  favoriteStudents: [],
  currentStudent: null,
  studentsLoading: false,
  studentsError: null,
  studentLoading: false,
  studentError: null,
};

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.allStudents = state.allStudents.filter(
        (student) => student.id !== action.payload
      );
      state.filteredStudents = state.filteredStudents.filter(
        (student) => student.id !== action.payload
      );
    },
    addFavoriteStudents: (state, action: PayloadAction<string>) => {
      if (state.favoriteStudents.includes(action.payload)) {
        state.favoriteStudents = state.favoriteStudents.filter(
          (id) => id !== action.payload
        );
      } else {
        state.favoriteStudents.push(action.payload);
      }
    },
    addNewStudent: (state, action: PayloadAction<Student>) => {
      state.allStudents.unshift(action.payload);
      state.filteredStudents.unshift(action.payload);
    },
    filterStudentsByHouse: (state, action: PayloadAction<string>) => {
      state.filteredStudents = state.allStudents.filter(
        (student) => student.house === action.payload
      );
    },
    resetFilter: (state) => {
      state.filteredStudents = [...state.allStudents];
    },
    showFavoriteStudents: (state) => {
      state.filteredStudents = state.allStudents.filter((student) =>
        state.favoriteStudents.includes(student.id)
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStudentsData.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(fetchStudentsData.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.allStudents = action.payload;
        state.filteredStudents = action.payload;
      })
      .addCase(fetchStudentsData.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload as string;
      })
      .addCase(fetchStudentDataById.pending, (state) => {
        state.studentLoading = true;
        state.studentError = null;
      })
      .addCase(fetchStudentDataById.fulfilled, (state, action) => {
        state.studentLoading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentDataById.rejected, (state, action) => {
        state.studentLoading = false;
        state.studentError = action.payload as string;
      });
  },
});

export const {
  deleteStudent,
  addFavoriteStudents,
  addNewStudent,
  filterStudentsByHouse,
  resetFilter,
  showFavoriteStudents,
} = studentsSlice.actions;
export default studentsSlice.reducer;

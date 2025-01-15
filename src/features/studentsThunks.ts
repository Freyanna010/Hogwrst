import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentsData = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://hp-api.onrender.com/api/characters/students",
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Loading error");
    }
  },
);

export const fetchStudentDataById = createAsyncThunk(
  "students/fetchStudentDataById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://hp-api.onrender.com/api/character/" + id,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Student not found");
    }
  },
);

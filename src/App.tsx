import "./App.css";
import { useEffect } from "react";
import { fetchStudentsData } from "@/features/studentsThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import type { RootState } from "@/store/store";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentsPage from "@/pages/studentsPages";
import StudentPage from "@/pages/studentPage";
import { ConfigProvider } from "antd";
import { hogwartsTheme } from "@/styles/theme";
import CreatePage from "./pages/createPage";
import VideoBg from "./componets/ui/VideoBg";
import Container from "./componets/ui/Container";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { studentsError } = useSelector(
    (state: RootState) => state.students,
  );

  useEffect(() => {
    dispatch(fetchStudentsData());   
  }, [dispatch]);

  return (
    <ConfigProvider theme={hogwartsTheme}>
      <VideoBg />
      <Container>
        {studentsError ? (
          <div> {studentsError} </div>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/students" />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/students/:id" element={<StudentPage />} />
            <Route path="/create-student" element={<CreatePage />} />
          </Routes>
        )}
      </Container>
    </ConfigProvider>
  );
}

export default App;

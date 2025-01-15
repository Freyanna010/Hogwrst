import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import StudentsPage from "@/pages/studentsPages";
import StudentPage from "@/pages/studentPage";
import { ConfigProvider } from "antd";
import { hogwartsTheme } from "@/styles/theme";
import CreatePage from "./pages/createPage";
import VideoBg from "./componets/ui/VideoBg";
import Container from "./componets/ui/Container";
import { FC } from "react";

const App: FC = () => (
  <ConfigProvider theme={hogwartsTheme}>
    <VideoBg />
    <Container>
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentPage />} />
        <Route path="/create-student" element={<CreatePage />} />
      </Routes>
    </Container>
  </ConfigProvider>
);

export default App;

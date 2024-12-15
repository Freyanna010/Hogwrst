import { AppDispatch, RootState } from "@/store/store";
import { Button, Col, Row, Typography } from "antd";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "../StudentCard";
import avatar from "@assets/hogAvatar.webp";
import {
  addFavoriteStudents,
  deleteStudent,
  filterStudentsByHouse,
  resetFilter,
  showFavoriteStudents,
} from "@/features/studentsSlice";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { hogwartsTheme } from "@/styles/theme";

const StudentsList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredStudents,  studentsLoading } = useSelector(
    (state: RootState) => state.students
  );

  const { Title } = Typography;
  const { color, shadow, border, colorPrimary } = hogwartsTheme.token;

  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  const handleShowStudentsClick = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      dispatch(showFavoriteStudents());
    } else {
      dispatch(resetFilter());
    }
  };

  const handleCreate = () => navigate("/create-student");
  const handleLikeClick = (studentId: string) =>
    dispatch(addFavoriteStudents(studentId));
  const handleDeleteClick = (studentId: string) =>
    dispatch(deleteStudent(studentId));
  const handleHouse = (house: string) => dispatch(filterStudentsByHouse(house));
  const handleTitle = () => dispatch(resetFilter());

  return (
    <>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 25,
          width: "calc(100% - 20px)",
          backgroundColor: color,
          padding: "16px 20px",
          border: border,
          boxShadow: shadow,
        }}
      >
        <Col style={{ flex: 1 }}>
          <Title
            onClick={handleTitle}
            level={2}
            style={{
              fontFamily: "Almendra",
              color: colorPrimary,
              margin: 0,
              textShadow: shadow,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Hogwarts students
          </Title>
        </Col>

        <Col style={{ display: "flex", gap: "12px" }}>
          <Button
            type="text"
            onClick={handleShowStudentsClick}
            style={{ textTransform: "uppercase" }}
          >
            {showFavorites ? "All students" : "Favorite students"}
          </Button>

          <Button type="text" onClick={handleCreate} icon={<PlusOutlined />} />
        </Col>
      </Row>

      <Row
        gutter={[24, 24]}
        justify="start"
        style={{ width: "100%", marginBottom: "25px" }}
      >
        {["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"].map((house) => (
          <Col key={house} xs={12} sm={12} md={12} lg={6} xl={6}>
            <Button
              type="primary"
              style={{
                width: "100%",
                textAlign: "center",
                color: color,
                border: border,
                textTransform: "uppercase",
              }}
              onClick={() => handleHouse(house)}
            >
              {house}
            </Button>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} justify="start" style={{ width: "100%" }}>
        {filteredStudents.map((student) => (
          <Col key={student.id} xs={12} sm={12} md={12} lg={8} xl={6}>
            <StudentCard
              id={student.id}
              image={student.image || avatar}
              name={student.name}
              house={student.house || "Unknown"}
              onLike={handleLikeClick}
              onDelete={handleDeleteClick}
              studentsLoading={studentsLoading}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StudentsList;
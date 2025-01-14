import StudentCard from "@/componets/StudentCard";
import StudentsList from "@/componets/StudentsList";
import {
  addFavoriteStudents,
  deleteStudent,
  filterStudentsByHouse,
  resetFilter,
  showFavoriteStudents,
} from "@/features/studentsSlice";
import { fetchStudentsData } from "@/features/studentsThunks";
import { AppDispatch, RootState } from "@/store/store";
import { hogwartsTheme } from "@/styles/theme";
import { Button, Col, Row, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "@assets/hogAvatar.webp";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { color, shadow, border, colorPrimary } = hogwartsTheme.token;

const StudentsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchStudentsData());
  }, [dispatch]);

  const { studentsError, filteredStudents, studentsLoading } = useSelector(
    (state: RootState) => state.students
  );

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
  const handleNavigateCreate = () => navigate("/create-student");
  // TODO: перенести в StudentsList?
  const handleLikeClick = (studentId: string) =>
    dispatch(addFavoriteStudents(studentId));
  const handleDeleteClick = (studentId: string) =>
    dispatch(deleteStudent(studentId));
  const handleHouse = (house: string) => dispatch(filterStudentsByHouse(house));
  const handleTitle = () => dispatch(resetFilter());

  return studentsError ? (
    <div>{studentsError}</div>
  ) : (
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
          <Button
            type="text"
            onClick={handleNavigateCreate}
            icon={<PlusOutlined />}
          />
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
        <StudentsList
          onLike={handleLikeClick}
          onDelete={handleDeleteClick}
          studentsLoading={studentsLoading}
          students={filteredStudents}
        />
      </Row>
    </>
    //
  );
};

export default StudentsPage;

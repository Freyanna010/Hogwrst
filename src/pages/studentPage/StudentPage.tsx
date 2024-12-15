import StudentInfoCard from "@/componets/StudentInfoCard";
import { fetchStudentDataById } from "@/features/studentsThunks";
import { AppDispatch, RootState } from "@/store/store";
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentStudent } = useSelector((state: RootState) => state.students);
// TODO: добавать переход на нового студента
  useEffect(() => {
    if (id) {
      dispatch(fetchStudentDataById(id));
      console.log(currentStudent);
    }
  }, [dispatch]);

  return (
    <>
      <StudentInfoCard />
    </>
  );
};

export default StudentPage;

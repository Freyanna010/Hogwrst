import { Col } from "antd";
import { FC } from "react";

import StudentCard from "../StudentCard";
import avatar from "@assets/hogAvatar.webp";
import { Student } from "@/types/types";

type Props = {
  onLike: (studentId: string) => void;
  onDelete: (studentId: string) => void;
  studentsLoading: boolean;
  students: Student[]
}

const StudentsList: FC<Props> = ({onLike, onDelete,studentsLoading,  students}) => (

  <>
    {students.map((student) => (
      <Col key={student.id} xs={12} sm={12} md={12} lg={8} xl={6}>
        <StudentCard
          id={student.id}
          image={student.image || avatar}
          name={student.name}
          house={student.house || "Unknown"}
          onLike={onLike}
          onDelete={onDelete}
          studentsLoading={studentsLoading}
        />
      </Col> 
    ))}
  </>
);
export default StudentsList;

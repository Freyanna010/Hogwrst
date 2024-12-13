import { RootState } from "@/store/store";
import { Button, Col, Image, Row, Spin, Typography } from "antd";
import { useSelector } from "react-redux";
import LineRow from "../ui/LineRow";
import { useNavigate } from "react-router-dom";
import BgCard from "../ui/BgCard";
import { calculateAge } from "@/utils/dateUtils";
import { LoadingOutlined } from "@ant-design/icons";
import avatar from "@assets/hogAvatar.webp";
import { hogwartsTheme } from "@/styles/theme";

const StudentInfoCard = () => {
  const { currentStudent, studentLoading, studentsError } = useSelector(
    (state: RootState) => state.students,
  );

  const student = currentStudent ? currentStudent[0] : null;

  const navigate = useNavigate();

  const { Title } = Typography;
  const { shadow } = hogwartsTheme.token;

  const handleReturn = () => navigate("/students");

  if (student) {
    return (
      <>
        {studentLoading ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 60,
                  boxShadow: shadow,
                  borderRadius: "50%",
                }}
                spin
              />
            }
          />
        ) : studentsError ? (
          <div>{studentsError}</div>
        ) : (
          <BgCard>
            <Row gutter={16}>
              <Col span={24}>
                <Button onClick={handleReturn} style={{ marginBottom: "16px" }}>
                  Return
                </Button>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Image width={220} height={300} src={student.image || avatar} />
                <Title level={1} style={{ paddingTop: 10 }}>
                  {student.name}
                </Title>
                {student.wizard && <Title level={4}>Wizard</Title>}
              </Col>

              <Col span={18}>
                {student.alternate_names.length > 0 && (
                  <LineRow>
                    <Title level={4}>Alternate names:</Title>
                    {student.alternate_names.map((name, index) => (
                      <Title level={5} key={index}>
                        {name}
                        {index < student.alternate_names.length - 1 && ", "}
                      </Title>
                    ))}
                  </LineRow>
                )}

                <LineRow>
                  <Title level={4}>Gender: </Title>
                  <Title level={5}>{student.gender}</Title>
                </LineRow>

                <LineRow>
                  <Title level={4}>House: </Title>
                  <Title level={5}>{student.house || "unknown"}</Title>
                </LineRow>

                <LineRow>
                  <Title level={4}>Date of birth: </Title>
                  <Title level={5}>{student.dateOfBirth || "unknown"}</Title>
                </LineRow>

                <LineRow>
                  <Title level={4}>Age: </Title>
                  <Title level={5}>
                    {student.dateOfBirth
                      ? calculateAge(student.dateOfBirth)
                      : "unknown"}
                  </Title>
                </LineRow>

                {student.patronus && (
                  <LineRow>
                    <Title level={4}>Patronus: </Title>
                    <Title level={5}>{student.patronus}</Title>
                  </LineRow>
                )}
              </Col>
            </Row>
          </BgCard>
        )}
      </>
    );
  }
};

export default StudentInfoCard;

import { Button, Card, Flex, Image, Tooltip, Typography } from "antd";
import React, { FC, useState } from "react";
import { HeartOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getHouseColor } from "@/utils/colorUtils";
import { hogwartsTheme } from "@/styles/theme";

interface Props {
  id: string;
  image: string;
  name: string;
  house: string;
  onLike: (studentId: string) => void;
  onDelete: (studentId: string) => void;
  studentsLoading: boolean;
}

const StudentCard: FC<Props> = (props) => {
  const { id, image, name, house, onLike, onDelete, studentsLoading } = props;

  const { Title } = Typography;
  const { color } = hogwartsTheme.token;

  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleLikeClick = (
    studentId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike(studentId);
  };
  const handleDeleteClick = (
    studentId: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    onDelete(studentId);
  };
  const handleCardClick = (studentId: string) => {
    navigate(`/students/${studentId}`);
  };

  const CardColor = getHouseColor(house);

  return (
    <Card
      loading={studentsLoading}
      style={{
        width: "100%",

        backgroundColor: CardColor,
        cursor: "pointer",
        borderColor: color,
        padding: "1px 4px" ,
      }}
      hoverable
      onClick={() => handleCardClick(id)}
    >
      <Flex justify="end">
        <Tooltip title={isLiked ? "remove from favorites" : "add to favorites"}>
          <Button
            type="text"
            icon={
              isLiked ? (
                <HeartFilled style={{ color: color }} />
              ) : (
                <HeartOutlined style={{ color: color }} />
              )
            }
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleLikeClick(id, e)
            }
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text"
            icon={<DeleteOutlined style={{ color: color }} />}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleDeleteClick(id, e)
            }
          />
        </Tooltip>
      </Flex>
      <Flex justify="center" align="center" vertical>       <Image width={"auto"} height={320} src={image} style={{ minWidth: 255 }} /></Flex>

      <Flex justify="center" align="center" vertical>
        <Title
          level={4}
          style={{
            fontFamily: "Spectral ",
            color: color,
            fontWeight: 300,
            marginTop: 14,
          }}
        >
          {name}
        </Title>
        <Title
          level={4}
          style={{
            color: color,
            fontWeight: 700,
            margin: 0,
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          {house}
        </Title>
      </Flex>
    </Card>
  );
};

export default StudentCard;

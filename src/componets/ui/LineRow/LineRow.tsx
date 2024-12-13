import { Card, Flex } from "antd";
import { FC } from "react";

const LineRow: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Card
      style={{
        background: "none",
        border: "none",
        borderBottom: "2px solid #000",
        padding: "0px",
        margin: "0px",
      }}
      bodyStyle={{ padding: "0px" }}
    >
      <Flex gap="middle" align="baseline">
        {children}
      </Flex>
    </Card>
  );
};

export default LineRow;

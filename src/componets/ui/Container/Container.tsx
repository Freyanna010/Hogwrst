import { Layout } from "antd";
import { FC, ReactNode } from "react";
import classes from "./Container.module.scss";


const { Content } = Layout;

interface Container {
  children: ReactNode;
}

const Container: FC<Container> = ({ children }) => {
  return (
    <Layout
      style={{
        backgroundColor: "inherit",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Content
        className={classes.customScrollbar}
        style={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: 24,
          backgroundColor: "rgba(20, 20, 20, 0.6)",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default Container;

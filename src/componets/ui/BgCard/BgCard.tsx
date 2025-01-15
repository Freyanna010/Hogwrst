import { Card } from "antd";
import React, { FC } from "react";
import classes from "./BgCard.module.scss";

const BgCard: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Card className={classes.cardBg}>{children}</Card>;
};

export default BgCard;

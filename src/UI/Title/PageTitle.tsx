import React from "react";
import { type TitleProps } from "./type";
import styles from './PageTitle.module.css'

function PageTitle({ title }: TitleProps) {
  return (
    <div>
      <h1 className={styles.title}>GREEN-API Chat</h1>
    </div>
  );
}

export default PageTitle;

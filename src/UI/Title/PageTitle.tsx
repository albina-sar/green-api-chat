import styles from "./PageTitle.module.css";
import { type TitleProps } from "./type";

function PageTitle({ title }: TitleProps) {
  return (
    <div>
      <h1 className={styles.title}>GREEN-API Chat</h1>
    </div>
  );
}

export default PageTitle;

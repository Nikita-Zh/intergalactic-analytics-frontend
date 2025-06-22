import { Outlet } from "react-router-dom";
import { Navbar } from "../../Navbar/Navbar";

import styles from "./MainLayout.module.css";

export const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Outlet />
    </div>
  );
};

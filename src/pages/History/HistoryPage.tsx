import { NavLink } from "react-router-dom";
import { HistoryContainer } from "../../components/HistoryContainer/HistoryContainer";
import { Button } from "../../components/ui/Button/Button";

import styles from "./HistoryPage.module.css";
import { useReportListStore } from "../../api/reportListStore";

export const HistoryPage = () => {
  const { clearData } = useReportListStore();
  return (
    <div className={styles.wrapper}>
      <HistoryContainer />
      <div className={styles.button_group}>
        <NavLink to={"/generator"}>
          <Button variant="success">Сгенерировать больше</Button>
        </NavLink>
        <Button variant="dark" onClick={clearData}>
          Очистить всё
        </Button>
      </div>
    </div>
  );
};

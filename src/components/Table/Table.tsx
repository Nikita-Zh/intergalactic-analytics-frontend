import { useReportStore } from "../../api/reportStore";
import { dayNumberToDateStringRU } from "../../services/report";
import { Row } from "../Row/Row";

import styles from "./Table.module.css";

export const Table = () => {
  const { report } = useReportStore();
  return (
    <div className={styles.wrapper}>
      <Row
        text="общие расходы в галактических кредитах"
        value={report.total_spend_galactic.toFixed(2)}
      />
      <Row
        text="цивилизация с минимальными расходами"
        value={report.less_spent_civ}
      />
      <Row
        text="количество обработанных записей"
        value={report.rows_affected}
      />
      <Row
        text="день года с максимальными расходами"
        value={dayNumberToDateStringRU(report.big_spent_at)}
      />
      <Row
        text="день года с минимальными расходами"
        value={dayNumberToDateStringRU(report.less_spent_at)}
      />
      <Row
        text="максимальная сумма расходов за день"
        value={report.big_spent_value}
      />
      <Row
        text="цивилизация с максимальными расходами"
        value={report.big_spent_civ}
      />
      <Row
        text="средние расходы в галактических кредитах"
        value={report.average_spend_galactic.toFixed(2)}
      />
    </div>
  );
};


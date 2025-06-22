import { useReportStore, type SpendingReport } from "../../api/reportStore";
import { dayNumberToDateStringRU } from "../../utils/dayNumberToDateStringRU";
import { Row, type RowProps } from "../Row/Row";

import styles from "./Table.module.css";

const toReportRows = (item: SpendingReport): RowProps[] => [
  {
    text: "общие расходы в галактических кредитах",
    value: item.total_spend_galactic.toFixed(2),
  },
  {
    text: "цивилизация с минимальными расходами",
    value: item.less_spent_civ,
  },
  {
    text: "количество обработанных записей",
    value: item.rows_affected,
  },
  {
    text: "день года с максимальными расходами",
    value: dayNumberToDateStringRU(item.big_spent_at),
  },
  {
    text: "день года с минимальными расходами",
    value: dayNumberToDateStringRU(item.less_spent_at),
  },
  {
    text: "максимальная сумма расходов за день",
    value: item.big_spent_value,
  },
  {
    text: "цивилизация с максимальными расходами",
    value: item.big_spent_civ,
  },
  {
    text: "средние расходы в галактических кредитах",
    value: item.average_spend_galactic.toFixed(2),
  },
];

export const Table = () => {
  const { report } = useReportStore();
  return (
    <div className={styles.wrapper}>
      {toReportRows(report).map((row, index) => (
        <Row
          text={row.text}
          value={row.value}
          variant={row.variant}
          key={row.text + index}
        />
      ))}
    </div>
  );
};


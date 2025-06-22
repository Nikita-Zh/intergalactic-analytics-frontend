import { useMemo, useState } from "react";
import { HistoryItem } from "../HistoryItem/HistoryItem";
import { useReportListStore } from "../../api/reportListStore";
import { dayNumberToDateStringRU } from "../../services/report";
import { Modal } from "../ui/Modal/Modal";
import { Row, type RowProps } from "../Row/Row";
import type { SpendingReport } from "../../api/reportStore";

import styles from "./HistoryContainer.module.css";

const toReportRows = (item: SpendingReport): RowProps[] => [
  {
    text: "общие расходы в галактических кредитах",
    value: item.total_spend_galactic.toFixed(2),
    variant: "dark",
  },
  {
    text: "количество обработанных записей",
    value: item.rows_affected,
    variant: "dark",
  },
  {
    text: "день года с минимальными расходами",
    value: dayNumberToDateStringRU(item.less_spent_at),
    variant: "dark",
  },
  {
    text: "цивилизация с максимальными расходами",
    value: item.big_spent_civ,
    variant: "dark",
  },
  {
    text: "цивилизация с минимальными расходами",
    value: item.less_spent_civ,
    variant: "dark",
  },
  {
    text: "день года с максимальными расходами",
    value: dayNumberToDateStringRU(item.big_spent_at),
    variant: "dark",
  },
  {
    text: "максимальная сумма расходов за день",
    value: item.big_spent_value,
    variant: "dark",
  },
  {
    text: "средние расходы в галактических кредитах",
    value: item.average_spend_galactic.toFixed(2),
    variant: "dark",
  },
];

export const HistoryContainer = () => {
  const { dataList: reportList, removeItem } = useReportListStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<SpendingReport | undefined>(undefined);

  const list = useMemo(() => [...reportList].reverse(), [reportList]);

  const handleOpenItem = (id: string) => {
    const item = reportList.find((item) => item.id === id);
    console.log(item);

    if (item?.report) {
      setCurrent(item.report);
      setIsOpen(true);
    }
  };

  const handleDeleteItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div className={styles.wrapper}>
      {!Boolean(list.length) && (
        <p className={styles.message}>
          История пуста. Здесь будут отображаться ваши загруженные отчёты.
        </p>
      )}
      {list.map((item, index) => {
        return (
          <HistoryItem
            data={item}
            isDisabled={item.isSuccess}
            onClick={() => (item.isSuccess ? handleOpenItem(item.id) : {})}
            onDelete={() => handleDeleteItem(item.id)}
            key={index}
          />
        );
      })}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {current ? (
          <div className={styles.modal_body}>
            {toReportRows(current).map((row) => (
              <Row text={row.text} value={row.value} variant={row.variant} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};


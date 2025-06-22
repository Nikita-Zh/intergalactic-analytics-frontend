import { useReportStore } from "../../api/reportStore";
import { Table } from "../../components/Table/Table";
import { UploadForm } from "../../components/UploadForm/UploadForm";

import styles from "./AnalyticsPage.module.css";

export const AnalyticsPage = () => {
  const isLoaded = useReportStore((state) => state.isLoaded);

  return (
    <div className={styles.wrapper}>
      <UploadForm />
      {isLoaded ? (
        <Table />
      ) : (
        <div className={styles.dummy}>
          <span>Здесь</span> <span>появятся хайлайты</span>
        </div>
      )}
    </div>
  );
};

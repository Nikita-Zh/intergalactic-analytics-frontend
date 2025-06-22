import { useState } from "react";
import { reportApi } from "../../api/reportApi";
import { Button } from "../../components/ui/Button/Button";
import { ButtonUpload } from "../../components/ui/ButtonUpload/ButtonUpload";
import { downloadReport } from "../../services/report";
import type { UploadStatus } from "../../components/ui/ButtonUpload/ButtonUpload";
import styles from "./GeneratorPage.module.css";

const statusMessage: Record<UploadStatus, { title: string; message: string }> =
  {
    uploaded: { title: "", message: "" },
    parsing: { title: "", message: "идёт процесс генерации" },
    parsed: { title: "Done!", message: "файл сгенерирован!" },
    error: { title: "Ошибка", message: "упс, не то..." },
    default: { title: "", message: "" },
  };

export const GeneratorPage = () => {
  const [status, setStatus] = useState<UploadStatus>("default");

  const handleBack = () => {
    setStatus("default");
  };

  const handleSubmit = async () => {
    try {
      setStatus("parsing");
      await downloadReport(await reportApi.generateReport({ size: 0.001 }));
      setStatus("parsed");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </div>
      {status === "default" ? (
        <Button variant="success" onClick={handleSubmit}>
          Начать генерацию
        </Button>
      ) : (
        <ButtonUpload
          status={status}
          title={statusMessage[status].title}
          message={statusMessage[status].message}
          onClick={() => {}}
          onRemove={handleBack}
          isLoading={status === "parsing"}
        ></ButtonUpload>
      )}
    </div>
  );
};

import {
  type DragEvent,
  type ChangeEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";

import styles from "./UploadForm.module.css";
import {
  ButtonUpload,
  type UploadStatus,
} from "../ui/ButtonUpload/ButtonUpload";
import { Button } from "../ui/Button/Button";
import { reportApi } from "../../api/reportApi";
import {
  decodeAggregateStream,
  getDateNowFormat,
  type SaveReportData,
} from "../../services/report";
import { useReportStore } from "../../api/reportStore";
import { useReportListStore } from "../../api/reportListStore";

const statusMessage: Record<UploadStatus, string> = {
  uploaded: "файл загружен!",
  parsing: "идёт парсинг файла",
  parsed: "готово!",
  error: "упс, не то...",
  default: "или перетащите сюда",
};

export const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("default");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setReport } = useReportStore();
  const { addItem } = useReportListStore();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const saveFile = (inputFile: File) => {
    if (validateFile(inputFile)) {
      setFile(inputFile);
      setStatus("uploaded");
      console.log("Файл загружен: ", file?.name);
    } else {
      console.log("Пожалуйста, загрузите CSV файл");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      saveFile(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      saveFile(selectedFile);
    }
  };

  const validateFile = (file: File) => {
    return file.type === "text/csv" || file.name.toLowerCase().endsWith(".csv");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStatus("default");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!file) return;
      console.log("Файл отправлен:", file);
      setStatus("parsing");
      const responseReport = await decodeAggregateStream(
        await reportApi.aggregateReport(file),
        (data) => {
          setReport(data);
        }
      );

      console.log("NEXT", responseReport);

      let data: SaveReportData;

      if (responseReport) {
        data = {
          id: crypto.randomUUID(),
          report: responseReport,
          fileName: file.name,
          isSuccess: true,
          date: getDateNowFormat(),
        };
      } else {
        data = {
          id: crypto.randomUUID(),
          report: null,
          fileName: file.name,
          isSuccess: false,
          date: getDateNowFormat(),
        };
      }
      addItem(data);
      // saveReport(data);
      setStatus("parsed");
      // handleRemoveFile();
    } catch (e) {
      let data: SaveReportData = {
        id: crypto.randomUUID(),
        report: null,
        fileName: file ? file.name : "unknown",
        isSuccess: false,
        date: getDateNowFormat(),
      };
      addItem(data);
      setStatus("error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>
          Загрузите csv файл и получите <b>полную информацию</b> о нём за
          сверхнизкое время
        </p>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={styles.label}
          style={{
            textAlign: "center",
            backgroundColor: isDragOver ? "#D4FAE6" : "#EACDFF",
            marginBottom: "1rem",
          }}
        >
          <ButtonUpload
            isLoading={status === "parsing"}
            title={file?.name || "Загрузить файл"}
            onClick={handleUploadClick}
            onRemove={handleRemoveFile}
            status={status}
            message={statusMessage[status]}
          ></ButtonUpload>

          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileSelect}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        <Button
          type="submit"
          variant="success"
          disabled={!file || status === "parsing"}
          className={styles.submit_button}
        >
          Отправить
        </Button>
      </form>
    </div>
  );
};

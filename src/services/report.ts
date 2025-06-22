import { type SpendingReport } from "../api/reportStore";

export const decodeAggregateStream = async (
  response: Response,
  onData?: (data: SpendingReport) => void,
): Promise<SpendingReport | null> => {
  const decoder = new TextDecoder();
  const reader = response.body?.getReader();

  if (!reader) return null;

  let res: SpendingReport | null = null;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (value) {
        res = JSON.parse(
          decoder.decode(value, { stream: true }),
        ) as SpendingReport;
        onData && onData(res);
      }
      if (done) {
        return res;
      }
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const dayNumberToDateStringRU = (
  dayNumber: number,
  year = new Date().getFullYear(),
) => {
  const date = new Date(year, 0, dayNumber);
  const day = date.getDate();

  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
};

export const downloadReport = async (response: Response) => {
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "report.csv";

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};

export type SaveReportData = {
  id: string;
  report: SpendingReport | null;
  fileName: string;
  isSuccess: boolean;
  date: string;
};

// export const REPORT_LIST = "reportList";
// export type ReportList = SaveReportData[];
// const storage = createStorage<ReportList>();

// export const saveReport = (data: SaveReportData) => {
//   let reportList = storage.getData(REPORT_LIST);
//   if (!reportList) {
//     reportList = [];
//   }
//   reportList.push(data);
//   storage.setItem(REPORT_LIST, reportList);
//   // storage.setItem()
// };

// export const deleteReportItem = (item: SaveReportData) => {
//   console.log("try_delete: ", item);
//   let reportList = storage.getData(REPORT_LIST);
//   console.log("reportList: ", reportList);
//   console.log("reportList: ", reportList?.filter((el) => el != item));
//   reportList &&
//     storage.setItem(
//       REPORT_LIST,
//       reportList.filter((el) => JSON.stringify(el) !== JSON.stringify(item)),
//     );
// };

export const getDateNowFormat = (): string => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  return `${day}.${month}.${year}`;
};

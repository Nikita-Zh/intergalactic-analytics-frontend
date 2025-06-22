import { type SpendingReport } from "../api/reportStore";

export type SaveReportData = {
  id: string;
  report: SpendingReport | null;
  fileName: string;
  isSuccess: boolean;
  date: string;
};

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

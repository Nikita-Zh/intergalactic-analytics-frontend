const BASE_URL = "http://localhost:3000" as const;

export const reportApi = {
  async generateReport(
    {
      size,
      withErrors = "off",
      maxSpend = "1000",
    }: {
      size: number;
      withErrors?: string;
      maxSpend?: string;
    },
  ) {
    const params = new URLSearchParams({
      "size": size.toString(),
      "withErrors": withErrors,
      "maxSpend": maxSpend,
    });

    const response = await fetch(`${BASE_URL}/report?${params}`, {
      method: "get",
    });

    if (!response.ok) throw new Error("Failed to generate report");

    return response;
  },

  async aggregateReport(file: File) {
    const data = new FormData();
    data.append("document", file);
    const response = await fetch(`${BASE_URL}/aggregate?rows=${350}`, {
      method: "post",
      body: data,
    });

    if (!response.ok) throw new Error("Failed to aggregate report");

    return response;
  },
};

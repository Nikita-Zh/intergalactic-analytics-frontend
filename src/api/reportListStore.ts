import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SpendingReport } from "./reportStore";

export type SaveReportData = {
    id: string;
    report: SpendingReport | null;
    fileName: string;
    isSuccess: boolean;
    date: string;
};

type ReportListStore = {
    dataList: SaveReportData[];
    setData: (newData: SaveReportData[]) => void;
    addItem: (item: SaveReportData) => void;
    removeItem: (id: string) => void;
    clearData: () => void;
};

export const useReportListStore = create<ReportListStore>()(persist((set) => ({
    dataList: [],

    setData: (newData: SaveReportData[]) => set({ dataList: newData }),

    addItem: (item: SaveReportData) =>
        set((state) => ({ dataList: [...state.dataList, item] })),

    removeItem: (id) =>
        set((state) => {
            const newReportList = state.dataList.filter((el) => el.id !== id);
            return { dataList: newReportList };
        }),

    clearData: () =>
        set(() => {
            return { dataList: [] };
        }),
}), { name: "reportList" }));

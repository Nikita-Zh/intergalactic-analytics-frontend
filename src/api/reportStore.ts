import { create } from "zustand";

export type SpendingReport = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
};

type SpendingReportStore = {
    report: SpendingReport;
    isLoaded: boolean;
    setReport: (newReport: SpendingReport) => void;
};

export const useReportStore = create<SpendingReportStore>((set) => ({
    report: {
        total_spend_galactic: 0,
        rows_affected: 0,
        less_spent_at: 0,
        big_spent_at: 0,
        less_spent_value: 0,
        big_spent_value: 0,
        average_spend_galactic: 0,
        big_spent_civ: "-",
        less_spent_civ: "-",
    },
    isLoaded: false,
    setReport: (newReport) =>
        set((state) => ({
            report: {
                ...state.report,
                ...newReport,
            },
            isLoaded: true,
        })),
}));

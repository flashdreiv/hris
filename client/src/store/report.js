import api from "../api";
import { produce } from "immer";

const report = (set, get) => ({
  getReportsSummary: async (dateFrom, dateTo) => {
    try {
      const response = await api.get("/reports", {
        params: { dateFrom, dateTo },
      });

      set(
        produce((state) => {
          state.timelogs.data = response.data;
        })
      );
    } catch (err) {
      console.log(err);
    }
  },
});

export default report;

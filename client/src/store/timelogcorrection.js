import api from "../api";
import { produce } from "immer";

const timelogcorrection = (set, get) => ({
  timelogcorrections: {},
  selectedTimelogCorrection: {},
  addTimelogCorrection: async (data) => {
    try {
      const response = await api.post("/timelog/correction", data);
      set(
        produce((state) => {
          state.selectedTimelogCorrection = response.data;
        })
      );
    } catch (err) {}
  },
});

export default timelogcorrection;

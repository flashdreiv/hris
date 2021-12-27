import api from "../api";
import { produce } from "immer";
import { mapKeys } from "lodash";

const timelogcorrection = (set, get) => ({
  timelogCorrections: {},
  selectedTimelogCorrection: {},
  getTimelogCorrections: async (data) => {
    try {
      const response = await api.get("/timelog/correction");
      set(
        produce((state) => {
          state.timelogCorrections = mapKeys(response.data, "_id");
        })
      );
    } catch (err) {}
  },
  addTimelogCorrection: async (data) => {
    try {
      const response = await api.post("/timelog/correction", data);
      set(
        produce((state) => {
          state.selectedTimelogCorrection = response.data;
          state.timelogCorrections[data.id] = response.data;
        })
      );
    } catch (err) {}
  },
  updateTimelogCorrection: async (data) => {
    try {
      const response = await api.patch(`/timelog/correction/${data.id}`, data);
      set(
        produce((state) => {
          state.timelogCorrections[data.id] = response.data;
        })
      );
    } catch (err) {}
  },
  deleteTimelogCorrection: async (correctionId) => {
    try {
      await api.delete(`/timelog/correction/${correctionId}`);
      set(
        produce((state) => {
          delete state.timelogCorrections[correctionId];
        })
      );
    } catch (err) {}
  },
});

export default timelogcorrection;

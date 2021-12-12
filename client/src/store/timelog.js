import api from "../api";
import { produce } from "immer";
import mapKeys from "lodash/mapKeys";

const timelog = (set, get) => ({
  timelogs: {
    data: {},
    pagination: { current: null, pageSize: null, total: null },
  },
  selectedTimelog: {},
  timelogStatus: "",
  fetchTimelogs: async (page = 1) => {
    try {
      const response = await api.get(`/timelog/${page}`);
      set(
        produce((state) => {
          state.timelogs = response.data;
          state.timelogs.data = mapKeys(response.data.data, "_id");
          state.status.loading = false;
        })
      );
    } catch (err) {
      set(
        produce((state) => {
          state.status.errorMessage = err.response.data;
          state.status.loading = false;
        })
      );
    }
  },

  timeIn: async (timeIn) => {
    try {
      const response = await api.post("/timelog", { timeIn });
      set(
        produce((state) => {
          state.status.loading = true;
          state.selectedTimelog = response.data;
          state.timelogs.data = {
            [response.data._id]: response.data,
            ...state.timelogs.data,
          };
          state.status.loading = false;
        })
      );
    } catch (err) {}
  },

  timeOut: async (timeOut) => {
    try {
      const response = await api.patch("/timelog", { timeOut });
      set(
        produce((state) => {
          state.status.loading = true;
          state.selectedTimelog = response.data;
          state.timelogs.data[response.data._id] = response.data;
          state.status.loading = false;
        })
      );
    } catch (err) {}
  },

  timelogCheck: async () => {
    try {
      const response = await api.get("/timelog/check");
      set(
        produce((state) => {
          state.status.loading = true;
          state.timelogStatus = response.data;
          state.status.loading = false;
        })
      );
    } catch (err) {}
  },
});

export default timelog;

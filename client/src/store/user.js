import api from "../api";
import { produce } from "immer";
import mapKeys from "lodash/mapKeys";

const user = (set, get) => ({
  users: {},
  getUsers: async () => {
    try {
      const response = await api.get("/users");
      set(
        produce((state) => {
          state.users = mapKeys(response.data, "_id");
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
});

export default user;

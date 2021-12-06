import api from "../api";
import { produce } from "immer";
import { getFromLocalStorage } from "../utils";
const auth = (set, get) => ({
  isLoggedIn: getFromLocalStorage().isLoggedIn,
  userData: getFromLocalStorage().userData,

  signIn: async (data) => {
    try {
      const response = await api.post("/auth/login", { token: data.tokenId });
      set(
        produce((state) => {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ isLoggedIn: true, userData: response.data })
          );
          state.isLoggedIn = true;
          state.userData = response.data;
          state.status.loading = false;
          state.status.errorMessage = "";
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

  signOut: async () => {
    try {
      set(
        produce((state) => {
          localStorage.removeItem("userInfo");
          state.isLoggedIn = false;
          state.userData = null;
          state.status.loading = false;
          state.status.errorMessage = "";
        })
      );
    } catch (err) {}
  },
});

export default auth;

import create from "zustand";
import { devtools } from "zustand/middleware";
import uistate from "./uistate";
import auth from "./auth";

const store = (set, get) => ({
  ...auth(set, get),
  ...uistate(set, get),
});

const useStore = create(devtools(store), { name: "My store" });

export default useStore;

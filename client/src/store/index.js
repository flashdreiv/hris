import create from "zustand";
import { devtools } from "zustand/middleware";
import uistate from "./uistate";
import auth from "./auth";
import timelog from "./timelog";

const store = (set, get) => ({
  ...auth(set, get),
  ...timelog(set, get),
  ...uistate(set, get),
});

const useStore = create(devtools(store), { name: "My store" });

export default useStore;

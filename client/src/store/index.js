import create from "zustand";
import { devtools } from "zustand/middleware";
import uistate from "./uistate";
import auth from "./auth";
import timelog from "./timelog";
import user from "./user";
import timelogcorrection from "./timelogcorrection";

const store = (set, get) => ({
  ...auth(set, get),
  ...timelog(set, get),
  ...timelogcorrection(set, get),
  ...user(set, get),
  ...uistate(set, get),
});

const useStore = create(devtools(store), { name: "My store" });

export default useStore;

import create from "zustand";
import { devtools } from "zustand/middleware";
import uistate from "./uistate";
import auth from "./auth";
import timelog from "./timelog";
import user from "./user";
import timelogcorrection from "./timelogcorrection";
import report from "./report";

const store = (set, get) => ({
  ...auth(set, get),
  ...uistate(set, get),
  ...timelog(set, get),
  ...timelogcorrection(set, get),
  ...user(set, get),
  ...report(set, get),
});

const useStore = create(devtools(store), { name: "My store" });

export default useStore;

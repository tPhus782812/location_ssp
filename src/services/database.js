import { openDB } from "idb";

export const dbPromise = openDB("warehouse-manager", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("files")) {
      db.createObjectStore("files");
    }

    if (!db.objectStoreNames.contains("productMaster")) {
      db.createObjectStore("productMaster");
    }
  },
});
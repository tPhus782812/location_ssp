import { dbPromise } from "./database";

// =============================
// Save File
// =============================

export async function saveData(key, value) {

    const db = await dbPromise;

    return db.put("files", value, key);

}

// =============================

export async function getData(key) {

    const db = await dbPromise;

    return await db.get("files", key);

}

// =============================

export async function deleteData(key) {

    const db = await dbPromise;

    return db.delete("files", key);

}

// =============================
// Product Master
// =============================

export async function saveProductMaster(master) {

    const db = await dbPromise;

    return db.put(

        "files",

        {

            fileName: "Generated Product Master",

            uploadTime: new Date().toLocaleString(),

            rows: master.products.length,

            version: master.version,

            data: master

        },

        "productMaster"

    );

}

export async function getProductMaster() {

    const db = await dbPromise;

    const master = await db.get(

        "files",

        "productMaster"

    );

    if (!master) return null;

    return master.data;

}

// =============================

export async function getAllFiles() {

    const db = await dbPromise;

    return db.getAllKeys("files");

}

// =============================

export async function clearStore() {

    const db = await dbPromise;

    return db.clear("files");

}

export async function exportDatabase() {
  const db = await dbPromise;

  const keys = await db.getAllKeys("files");

  const data = {};

  for (const key of keys) {
    data[key] = await db.get("files", key);
  }

  return data;
}
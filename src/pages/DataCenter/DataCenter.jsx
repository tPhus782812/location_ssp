import { useEffect, useState } from "react";

import {
  getData,
  getAllFiles,
  deleteData,
  clearStore,
} from "../../services/storageService";

import "./DataCenter.css";

function DataCenter() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const keys = await getAllFiles();

    const result = [];

    for (const key of keys) {
      const file = await getData(key);

      if (file) {
        result.push({
          key,
          ...file,
        });
      }
    }

    setFiles(result);
  }

  async function removeFile(key) {
    if (!window.confirm(`Xóa ${key}?`)) return;

    await deleteData(key);

    loadFiles();
  }

  async function removeAll() {
    if (!window.confirm("Xóa toàn bộ dữ liệu?")) return;

    await clearStore();

    loadFiles();
  }

  return (
    <div className="data-page">
      <div className="data-header">
        <h1>Data Center</h1>

        <button
          className="danger-btn"
          onClick={removeAll}
        >
          Clear Database
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>File</th>
            <th>Rows</th>
            <th>Version</th>
            <th>Upload</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {files.map((file) => (
            <tr key={file.key}>
              <td>{file.key}</td>

              <td>{file.fileName}</td>

              <td>{file.rows?.toLocaleString()}</td>

              <td>{file.version}</td>

              <td>{file.uploadTime}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => removeFile(file.key)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataCenter;
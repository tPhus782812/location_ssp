import {
  FaBoxOpen,
  FaBarcode,
  FaWarehouse,
  FaMapMarkerAlt,
  FaTruck,
  FaFileExcel,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import DashboardCard from "../../components/DashboardCard/DashboardCard";
import UploadCard from "../../components/UploadCard/UploadCard";

import { readExcel } from "../../services/excelService";
import { generateProductMaster } from "../../services/productMasterService";

import {
  saveData,
  getData,
  saveProductMaster,
} from "../../services/storageService";

import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    stock: 0,
    barcode: 0,
    locations: 0,
  });

  const [files, setFiles] = useState({
    soh: null,
    // location: null,
    shipment: null,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  // =============================
  // Load Dashboard
  // =============================

async function loadDashboard() {
  const soh = await getData("sohData");
  const location = await getData("locationData");
  const shipment = await getData("shipmentData");
  const masterFile = await getData("productMaster");

  setFiles({
    soh,
    location,
    shipment,
  });

  // Chưa có Product Master
  if (!masterFile) {
    setStats({
      products: 0,
      stock: 0,
      barcode: 0,
      locations: 0,
    });
    return;
  }

  // Hỗ trợ cả 2 kiểu lưu
  const master =
    masterFile.products ??
    masterFile.data?.products ??
    [];

  if (!Array.isArray(master)) {
    setStats({
      products: 0,
      stock: 0,
      barcode: 0,
      locations: 0,
    });
    return;
  }

  const totalStock = master.reduce(
    (sum, item) => sum + Number(item.stock || 0),
    0
  );

  const totalLocation = master.reduce(
    (sum, item) => sum + (item.locations?.length || 0),
    0
  );

  setStats({
    products: master.length,
    barcode: master.length,
    stock: totalStock,
    // locations: totalLocation,
  });
}
  // =============================
  // Upload Function dùng chung
  // =============================

  const uploadExcel = async (file, key) => {
    if (!file) return;

    const excel = await readExcel(file);

    const old = await getData(key);

    const data = {
      fileName: file.name,
      uploadTime: new Date().toLocaleString(),
      rows: excel.length,
      version: old ? old.version + 1 : 1,
      data: excel,
    };

    await saveData(key, data);

    await loadDashboard();

    alert(`✅ ${file.name} Upload thành công`);
  };

  // =============================

  const handleSOH = async (e) => {
    uploadExcel(e.target.files[0], "sohData");
  };

  // const handleLocation = async (e) => {
  //   uploadExcel(e.target.files[0], "locationData");
  // };

  const handleShipment = async (e) => {
    uploadExcel(e.target.files[0], "shipmentData");
  };

  // =============================
  // Generate Product Master
  // =============================

  const handleGenerate = async () => {
    const sohFile = await getData("sohData");

if (!sohFile) {
    alert("Chưa upload SOH");
    return;
}

const master = generateProductMaster(
    sohFile.data
);

await saveProductMaster(master);

await loadDashboard();

    alert(`✅ Generate thành công\n${master.length} Products`);
  };

  // =============================

  const renderInfo = (file) => {
    if (!file) {
      return (
        <div className="upload-info empty">
          Chưa upload
        </div>
      );
    }

    return (
      <div className="upload-info">
        <p>
          <strong>{file.fileName}</strong>
        </p>

        <p>{file.rows.toLocaleString()} Rows</p>

        <p>Version {file.version}</p>

        <p>{file.uploadTime}</p>
      </div>
    );
  };

  return (
    
    <div className="dashboard-page">
      <div className="dashboard-title">

    <div>

        <h1>

            Warehouse Dashboard

        </h1>

    </div>

</div>
      <h1>Warehouse Dashboard</h1>

      {/* Dashboard */}

      {/* <div className="dashboard-grid">

        <DashboardCard
          title="Products"
          value={stats.products.toLocaleString()}
          icon={<FaBoxOpen />}
          color="#2563eb"
        />

        <DashboardCard
          title="Locations"
          value={stats.locations.toLocaleString()}
          icon={<FaMapMarkerAlt />}
          color="#16a34a"
        />

        <DashboardCard
          title="Barcode"
          value={stats.barcode.toLocaleString()}
          icon={<FaBarcode />}
          color="#ea580c"
        />

        <DashboardCard
          title="Stock"
          value={stats.stock.toLocaleString()}
          icon={<FaWarehouse />}
          color="#7c3aed"
        />

      </div> */}

      {/* Upload */}
{/* 
      <h2 className="upload-title">
        📂 Upload Center
      </h2> */}

      <div className="upload-grid">

        <div>

          <UploadCard
            title="Upload SOH"
            icon={<FaFileExcel color="green" />}
            onChange={handleSOH}
          />

          {renderInfo(files.soh)}

        </div>

        {/* <div>

          <UploadCard
            title="Upload Location"
            icon={<FaMapMarkerAlt color="red" />}
            onChange={handleLocation}
          />

          {renderInfo(files.location)}

        </div> */}

        <div>

          <UploadCard
            title="Upload Shipment"
            icon={<FaTruck color="orange" />}
            onChange={handleShipment}
          />

          {renderInfo(files.shipment)}

        </div>

      </div>

      <div
        style={{
          marginTop: 40,
        }}
      >
        <button
          className="generate-btn"
          onClick={handleGenerate}
        >
          🚀 Generate Product Master
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
import {
  FaTruck,
  FaFileExcel,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  const [files, setFiles] = useState({
    soh: null,
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
    const shipment = await getData("shipmentData");


    setFiles({
      soh,
      shipment,
    });

  }



  // =============================
  // Upload Excel
  // =============================

  const uploadExcel = async (file, key) => {

    if (!file) return;


    const excel = await readExcel(file);


    const old = await getData(key);


    const data = {

      fileName: file.name,

      uploadTime: new Date()
        .toLocaleString(),

      rows: excel.length,

      version: old
        ? old.version + 1
        : 1,

      data: excel,

    };


    await saveData(
      key,
      data
    );


    await loadDashboard();


    alert(
      `✅ ${file.name} Upload thành công`
    );

  };



  const handleSOH = (e) => {

    uploadExcel(
      e.target.files[0],
      "sohData"
    );

  };



  const handleShipment = (e) => {

    uploadExcel(
      e.target.files[0],
      "shipmentData"
    );

  };



  // =============================
  // Generate Product Master
  // =============================

  const handleGenerate = async () => {


    const sohFile = await getData(
      "sohData"
    );


    if (!sohFile) {

      alert(
        "Chưa upload SOH"
      );

      return;

    }



    const master = generateProductMaster(
      sohFile.data
    );


    await saveProductMaster(
      master
    );


    await loadDashboard();



    // Hiện popup thành công
    setShowSuccessPopup(true);

  };




  // =============================
  // Render file info
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

          <strong>
            {file.fileName}
          </strong>

        </p>


        <p>
          {file.rows.toLocaleString()} Rows
        </p>


        <p>
          Version {file.version}
        </p>


        <p>
          {file.uploadTime}
        </p>


      </div>

    );

  };





  return (

    <div className="dashboard-page">


      <div className="upload-grid">


        <div>


          <UploadCard

            title="Upload SOH"

            icon={
              <FaFileExcel color="green" />
            }

            onChange={handleSOH}

          />


          {renderInfo(files.soh)}


        </div>




        <div>


          <UploadCard

            title="Upload Shipment"

            icon={
              <FaTruck color="orange" />
            }

            onChange={handleShipment}

          />


          {renderInfo(files.shipment)}


        </div>



      </div>





      <div
        style={{
          marginTop: 40
        }}
      >


        <button

          className="generate-btn"

          onClick={handleGenerate}

        >

          🚀 Xác nhận

        </button>



      </div>







      {/* ===========================
          SUCCESS POPUP
      ============================ */}


      {showSuccessPopup && (

        <div className="popup-overlay">


          <div className="success-popup">


            <h2>
              ✅ Thành công
            </h2>



            <p>
              Product Master đã được tạo.
            </p>



            <p>
              Bạn muốn chuyển sang tìm kiếm sản phẩm?
            </p>




            <div className="popup-actions">


              <button

                className="search-btn"

                onClick={() => {

                  setShowSuccessPopup(false);

                  navigate(
                    "/finder"
                  );

                }}

              >

                🔍 Tìm kiếm

              </button>




              <button

                className="cancel-btn"

                onClick={() =>
                  setShowSuccessPopup(false)
                }

              >

                Ở lại Dashboard

              </button>



            </div>



          </div>



        </div>

      )}



    </div>

  );

}


export default Dashboard;
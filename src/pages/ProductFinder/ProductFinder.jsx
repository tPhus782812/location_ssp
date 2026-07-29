import { useEffect, useRef, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";

import { getProductMaster } from "../../services/storageService";

import CameraScanner from "../../components/CameraScanner/CameraScanner";
import {
  searchProducts,
  getSkuSizes,
  getColorVariants,
  getModelSkus,
  changeColor,
  changeSize,
  getSkuTotalStock
} from "../../services/searchService";

import "./ProductFinder.css";

function ProductFinder() {

  const inputRef = useRef(null);

  // ==========================
  // State
  // ==========================

  const [master, setMaster] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [status, setStatus] = useState("🟢 Ready To Scan");

  // SKU hiện tại
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Size của SKU hiện tại
  const [skuSizes, setSkuSizes] = useState([]);

  // Các màu cùng model
  const [colorVariants, setColorVariants] = useState([]);

  // Các SKU cùng model
  const [modelSkus, setModelSkus] = useState([]);

  const [totalStock, setTotalStock] = useState(0);

  const [cameraMode, setCameraMode] = useState(false);

  // ==========================
  // Load Product Master
  // ==========================

  useEffect(() => {

    loadMaster();

  }, []);

  async function loadMaster() {

    const data = await getProductMaster();

    if (!data) {

      setStatus("❌ Product Master Not Found");

      return;

    }

    const masterData =
      data.products
        ? data
        : data.data;

    console.log("MASTER", masterData);

    setMaster(masterData);

    setStatus("🟢 Ready To Scan");

  }

  // ==========================
  // Search
  // ==========================

 function doSearch(scanCode = "") {

    if (!master) {
        console.log("Master chưa load");
        return;
    }


    const key = String(
        scanCode || keyword
    ).trim();


    console.log(
        "Searching:",
        key
    );


    const result = searchProducts(
        master,
        key
    );


    console.log(
        "Result:",
        result
    );


    if(result.length===0){

        setSelectedProduct(null);

        setStatus(
            "❌ Product Not Found"
        );

        return;
    }


    const product=result[0];


    loadProduct(product);


    setStatus(
        `✅ ${product.searchName}`
    );


    setTimeout(()=>{
        setKeyword("");
        inputRef.current?.focus();
    },100);

}

  // ==========================
  // Clear
  // ==========================

  function clearSearch() {

    setKeyword("");

    setSelectedProduct(null);

    setSkuSizes([]);

    setColorVariants([]);

    setModelSkus([]);

    setStatus("🟢 Ready To Scan");

    inputRef.current?.focus();

  }

  // ==========================
  // Click Color
  // ==========================

  function handleColorClick(item) {

    loadProduct(item.product);
    // setTotalStock(

    //     getSkuTotalStock(master,product)

    // );

  }
  // ==========================
  // Click Size
  // ==========================

  function handleSizeClick(product) {

    loadProduct(product);


  }

  // ==========================
  // Click SKU
  // ==========================

  function handleSkuClick(product) {

    loadProduct(product);

  }
  function loadProduct(product) {

    setSelectedProduct(product);

    setColorVariants(
      getColorVariants(master, product)
    );

    setSkuSizes(
      getSkuSizes(master, product)
    );

    setModelSkus(
      getModelSkus(master, product)
    );

    inputRef.current?.focus();
    setTotalStock(

      getSkuTotalStock(master, product)

    );

  }

  function onCameraScan(code) {

    doSearch(code);

  }




  // ==========================

  return (
    <div className="finder-page">

      {/* ================= HEADER ================= */}

      <div className="finder-header">
        <h1>🔍 Tìm kiếm</h1>
        <p>Scan Barcode / Search SKU / Item Number</p>
      </div>

      {/* ================= SEARCH ================= */}

      <div className="search-wrapper">

        <input
          ref={inputRef}
          className="search-input"
          value={keyword}
          autoFocus
          placeholder="Scan Barcode..."
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") doSearch();
          }}
        />

        <button
          className="camera-btn"
          onClick={() => setCameraMode(!cameraMode)}
        >
          {cameraMode ? "📷 Đóng Camera" : "📷 Mở Camera"}
        </button>

        {/* <button
          className="clear-btn"
          onClick={clearSearch}
        >
          Xóa
        </button> */}

      </div>

      {/* ================= CAMERA ================= */}

      {cameraMode && (
        <div className="camera-wrapper">
          <CameraScanner
            onScan={onCameraScan}
          />
        </div>
      )}

      {/* ================= STATUS ================= */}

      <div className="finder-status">
        {status}
      </div>

      {/* ================= EMPTY ================= */}

      {!selectedProduct && (

        <div className="empty-result">

          <h2>📦 Xin mời scan</h2>

          <p>
            Sử dụng Camera hoặc máy Scan Barcode
          </p>

        </div>

      )}

      {/* ================= PRODUCT ================= */}

      {selectedProduct && (

        <>

          <ProductCard
            product={selectedProduct}
            totalStock={totalStock}
          />

          {/* ================= SIZE ================= */}

          <div className="variant-section">

            <h2>📏 Size</h2>

            <div className="variant-grid">

              {skuSizes.map((item) => (

                <button
                  key={item.barcode}
                  className={
                    item.barcode === selectedProduct.barcode
                      ? "variant-btn active"
                      : "variant-btn"
                  }
                  onClick={() => handleSizeClick(item)}
                >

                  <strong>{item.size}</strong>

                  <br />

                  <small>

                    {item.stock > 0
                      ? `📦 ${item.stock}`
                      : "Oder"}

                  </small>

                </button>

              ))}

            </div>

          </div>

          {/* ================= COLOR ================= */}

          <div className="variant-section">

            <h2>🎨 Color</h2>

            <div className="variant-grid">

              {colorVariants.map((item) => (

                <button
                  key={item.product.barcode}
                  className={
                    item.product.barcode === selectedProduct.barcode
                      ? "variant-btn active"
                      : "variant-btn"
                  }
                  onClick={() => handleColorClick(item)}
                >

                  {item.color}

                </button>

              ))}

            </div>

          </div>

          {/* ================= RELATED SKU ================= */}

          <div className="family-wrapper">

            <h2>🔄 SẢN PHẨM CÙNG MẪU</h2>

            <div className="family-grid">

              {modelSkus
                .filter(
                  (item) =>
                    item.searchName !== selectedProduct.searchName
                )
                .map((item) => (

                  <div
                    key={item.searchName}
                    className="family-card"
                    onClick={() => handleSkuClick(item)}
                  >

                    <h3>{item.searchName}</h3>

                    <p>{item.color}</p>

                    <p>{item.totalSize} Size</p>

                    <p>📦 {item.totalStock}</p>

                  </div>

                ))}

            </div>

          </div>

        </>

      )}

    </div>
  );

}

export default ProductFinder;
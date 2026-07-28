import { useEffect, useRef, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";

import { getProductMaster } from "../../services/storageService";

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

  const [totalStock,setTotalStock]=useState(0);


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

  function doSearch() {

    if (!master) return;

    const key = keyword.trim();

    if (key === "") {

      clearSearch();

      return;

    }

    const result = searchProducts(master, key);

    if (result.length === 0) {

      setSelectedProduct(null);

      setSkuSizes([]);

      setColorVariants([]);

      setModelSkus([]);

      setStatus("❌ Product Not Found");

      setKeyword("");

      inputRef.current?.focus();

      return;

    }

    const product = result[0];

    setSelectedProduct(product);

    // Size của đúng SKU
    setSkuSizes(
      getSkuSizes(master, product)
    );

    // Các màu cùng model
    setColorVariants(
      getColorVariants(master, product)
    );

    // Các SKU cùng model
    setModelSkus(
      getModelSkus(master, product)
    );

    const totalStock = getSkuTotalStock(master, product);

    setStatus(
      `✅ ${product.searchName}`
    );


    setKeyword("");

    setTimeout(() => {

      inputRef.current?.focus();

    }, 50);
    const stock=getSkuTotalStock(master,product);

setTotalStock(stock);

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

        getSkuTotalStock(master,product)

    );

  }

  


  // ==========================

  return (

    <div className="finder-page">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="finder-header">

        <h1>🔍 Tìm kiếm</h1>

        <p>Scan Barcode / Search SKU / Item Number</p>

      </div>

      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <div className="search-wrapper">

        <input
          ref={inputRef}
          className="search-input"
          value={keyword}
          placeholder="Scan Barcode..."
          autoFocus
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {

              doSearch();

            }

          }}
        />

        <button
          className="clear-btn"
          onClick={clearSearch}
        >
          Xóa
        </button>

      </div>

      {/* ========================= */}

      <div className="finder-status">

        {status}

      </div>

      {/* ========================= */}
      {/* Product */}
      {/* ========================= */}

      {

        !selectedProduct ?

          (

            <div className="empty-result">

              <h2>

                📦 Xin mời scan

              </h2>

              {/* <p>

                Scan Barcode & Search Name &  

              </p> */}

            </div>

          )

          :

          (

            <>

              <ProductCard

                product={selectedProduct}
                totalStock={totalStock}

              />

              {/* ========================= */}
              {/* Size */}
              {/* ========================= */}

              <div className="variant-section">

                <h2>

                  📏 Size

                </h2>

                <div className="variant-grid">

                  {

                    skuSizes.map(item => (

                      <button

                        key={item.barcode}

                        className={

                          item.barcode === selectedProduct.barcode

                            ?

                            "variant-btn active"

                            :

                            "variant-btn"

                        }

                        onClick={() =>

                          handleSizeClick(item)

                        }

                      >

                        <strong>

                          {item.size}

                        </strong>

                        <br />

                        {item.stock > 0

                          ?

                          `${item.stock}`

                          :

                          "Out"

                        }

                      </button>

                    ))

                  }

                </div>

              </div>

              {/* ========================= */}
              {/* Color */}
              {/* ========================= */}

              <div className="variant-section">

                <h2>

                  🎨 Color

                </h2>

                <div className="variant-grid">

                  {

                    colorVariants.map(item => (

                      <button

                        key={item.product.barcode}

                        className={

                          item.product.barcode === selectedProduct.barcode

                            ?

                            "variant-btn active"

                            :

                            "variant-btn"

                        }

                        onClick={() =>

                          handleColorClick(item)

                        }

                      >

                        {item.color}

                      </button>

                    ))

                  }

                </div>

              </div>

              {/* ========================= */}
              {/* Related SKU */}
              {/* ========================= */}

              <div className="family-wrapper">

                <h2>

                  SẢN PHẨM CÙNG MÀU

                </h2>

                <div className="family-grid">

                  {

                    modelSkus

                      .filter(

                        item =>

                          item.searchName !== selectedProduct.searchName

                      )

                      .map(item => (

                        <div

                          key={item.searchName}

                          className="family-card"

                          onClick={() =>

                            handleSkuClick(item)

                          }

                        >

                          <h3>

                            {item.searchName}

                          </h3>

                          <p>

                            {item.color}

                          </p>

                          <p>

                            {item.totalSize} Size

                          </p>

                          <p>

                            📦 {item.totalStock}

                          </p>

                        </div>

                      ))

                  }

                </div>

              </div>

            </>

          )

      }

    </div>

  );

}

export default ProductFinder;
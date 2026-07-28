import ProductHero from "../ProductHero/ProductHero";
import "./ProductCard.css";

function formatPrice(price) {
  return Number(price || 0).toLocaleString("vi-VN") + " đ";
}

function Item({ label, value }) {
  return (
    <div className="detail-item">
      <span>{label}</span>
      <strong>{value || "--"}</strong>
    </div>
  );
}

function ProductCard({ product,totalStock = 0, }) {

  if (!product) return null;

  return (

    <div className="product-card">

      {/* Header */}

      <ProductHero product={product}
        totalStock={totalStock} />

      {/* Hero */}

      <div className="hero-grid">

        <div className="hero-card location">

          <small>LOCATION</small>

          <h2>{product.location || "--"}</h2>

        </div>

        <div className="hero-card stock">

          <small>STOCK</small>

          <h2>{product.stock}</h2>

        </div>

        <div className="hero-card size">

          <small>SIZE</small>

          <h2>{product.size}</h2>

        </div>

      </div>

      {/* Detail */}

      {/* <div className="detail-grid">

        <Item
          label="Barcode"
          value={product.barcode}
        />

        <Item
          label="Item Number"
          value={product.itemNumber}
        />

        <Item
          label="Search Name"
          value={product.searchName}
        />

        <Item
          label="Warehouse"
          value={product.warehouse}
        />

        <Item
          label="Price"
          value={formatPrice(product.price)}
        />

        <Item
          label="Brand"
          value={product.brand}
        />

        <Item
          label="Color"
          value={product.color}
        />

        <Item
          label="Season"
          value={product.season}
        />

        <Item
          label="Division"
          value={product.division}
        />

        <Item
          label="Category"
          value={product.category}
        />

      </div> */}

    </div>

  );

}

export default ProductCard;
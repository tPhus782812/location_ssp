import "./ProductHero.css";

function ProductHero({ product, totalStock={totalStock} }) {

    if (!product) return null;

    return (

        <div className="">

           <div className="hero-header">

    <h1 className="product-name">

        {product.productName}

    </h1>

    <div className="sku-code">

      SKU:  {product.searchName}     '<span> {totalStock} PCS</span> '   

    </div>
     <div className="sku-stock">

       

    </div>

</div>

<div className="hero-price">

    {Number(product.price).toLocaleString("vi-VN")} ₫

</div>

            {/* <div
                className={
                    Number(product.stock) > 0
                        ? "hero-stock in"
                        : "hero-stock out"
                }
            >

                {

                    Number(product.stock) > 0

                        ?

                        "IN STOCK"

                        :

                        "OUT OF STOCK"

                }

            </div> */}

        </div>

    );

}

export default ProductHero;
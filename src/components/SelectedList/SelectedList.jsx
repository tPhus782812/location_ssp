import "./SelectedList.css";
import { useState } from "react";



function SelectedList({

    items,

    setItems,
    onClose

}) {

    // const [collapsed, setCollapsed] = useState(false);

    function increase(barcode) {

        setItems(prev =>

            prev.map(item =>

                item.barcode === barcode

                    ? {

                        ...item,

                        qty: item.qty + 1

                    }

                    : item

            )

        );

    }

    function decrease(barcode) {

        setItems(prev =>

            prev.flatMap(item => {

                if (item.barcode !== barcode)

                    return item;

                if (item.qty === 1)

                    return [];

                return {

                    ...item,

                    qty: item.qty - 1

                };

            })

        );

    }

    function remove(barcode) {

        setItems(prev =>

            prev.filter(

                item => item.barcode !== barcode

            )

        );

    }

    function clearAll() {

        setItems([]);

    }

    const totalQty =

        items.reduce(

            (sum, item) => sum + item.qty,

            0

        );


    return (

        <div className="selected-wrapper">

<div className="selected-header">

    <h2>
        🛒 Sản phẩm đã chọn ({items.length})
    </h2>

    <div className="selected-header-action">

        <button
            className="close-btn"
            onClick={onClose}
        >
            ← Quay lại
        </button>

        <button
            className="clear-selected"
            onClick={clearAll}
        >
            Clear
        </button>

    </div>

</div>
                    <>
                        <div className="selected-summary">

                            <div>

                                SKU

                                <strong>{items.length}</strong>

                            </div>

                            <div>

                                Qty

                                <strong>{totalQty}</strong>

                            </div>

                        </div>

                        {
                            items.length === 0 ?

                                <div className="selected-empty">

                                    No Product

                                </div>

                                :

                                <div className="selected-list">

                                    {

                                        items.map(item => (

                                            <div
                                                key={item.barcode}
                                                className="selected-card"
                                            >

                                                <div className="selected-info">

                                                    <strong>

                                                        {item.searchName}

                                                    </strong>

                                                    <p>{item.location}</p>

                                                    <p>{item.size}</p>

                                                </div>

                                                <div className="qty-box">

                                                    <button
                                                        onClick={() => decrease(item.barcode)}
                                                    >
                                                        -
                                                    </button>

                                                    <span>{item.qty}</span>

                                                    <button
                                                        onClick={() => increase(item.barcode)}
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                                <button
                                                    className="remove-btn"
                                                    onClick={() => remove(item.barcode)}
                                                >
                                                    ✕
                                                </button>

                                            </div>

                                        ))

                                    }

                                </div>

                        }

                    </>
                
            

        </div>

    );

}

export default SelectedList;
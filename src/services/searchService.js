function normalize(text = "") {
    return String(text)
        .trim()
        .toLowerCase();
}

/* =====================================================
   SEARCH PRODUCT
===================================================== */

export function searchProducts(masterData, keyword) {

    if (!masterData) return [];

    keyword = normalize(keyword);

    if (!keyword) return [];

    // Barcode
    const barcode = masterData.index.barcode[keyword];
    if (barcode) return [barcode];

    // Item Number
    const item = masterData.index.itemNumber[keyword];
    if (item) return [item];

    let result = [];

    // Search Name
    Object.keys(masterData.index.searchName).forEach(key => {

        if (key.includes(keyword)) {

            result.push(...masterData.index.searchName[key]);

        }

    });

    // Product Name

    masterData.products.forEach(product => {

        if (

            normalize(product.productName).includes(keyword)

        ) {

            result.push(product);

        }

    });

    // Brand

    masterData.products.forEach(product => {

        if (

            normalize(product.brand).includes(keyword)

        ) {

            result.push(product);

        }

    });

    // Location

    masterData.products.forEach(product => {

        if (

            normalize(product.location).includes(keyword)

        ) {

            result.push(product);

        }

    });

    // Remove Duplicate

    return result.filter(

        (item, index, self) =>

            index ===

            self.findIndex(

                p => p.barcode === item.barcode

            )

    );

}

/* =====================================================
   SIZE OF CURRENT SKU
   1175851-BLK
===================================================== */

export function getSkuSizes(masterData, product) {

    if (!masterData || !product) return [];

    return (

        masterData.index.sku[

            normalize(product.searchName)

        ] || []

    ).sort(

        (a, b) =>

            a.size.localeCompare(

                b.size,

                undefined,

                {

                    numeric: true

                }

            )

    );

}

/* =====================================================
   COLOR VARIANTS
   SAME MODEL + SAME SIZE
===================================================== */

export function getColorVariants(masterData, product) {

    if (!masterData || !product) return [];

    const modelProducts =

        masterData.index.model[

            normalize(product.modelCode)

        ] || [];

    const map = {};

    modelProducts.forEach(item => {

        if (

            normalize(item.size) !==

            normalize(product.size)

        ) return;

        const key = normalize(item.searchName);

        if (!map[key]) {

            map[key] = {

                color: item.color,

                colorCode: item.colorCode,

                stock: item.stock,

                product: item

            };

        }

    });

    return Object.values(map);

}

/* =====================================================
   ALL SKU OF SAME MODEL
===================================================== */

export function getModelSkus(masterData, product) {

    if (!masterData || !product) return [];

    const list =

        masterData.index.model[

            normalize(product.modelCode)

        ] || [];

    const skuMap = {};

    list.forEach(item => {

        const sku = normalize(item.searchName);

        if (!skuMap[sku]) {

            skuMap[sku] = {

                searchName: item.searchName,

                modelCode: item.modelCode,

                color: item.color,

                colorCode: item.colorCode,

                brand: item.brand,

                productName: item.productName,

                totalStock: 0,

                totalSize: 0,

                product: item

            };

        }

        skuMap[sku].totalStock += Number(item.stock);

        skuMap[sku].totalSize++;

    });

    return Object.values(skuMap);

}

/* =====================================================
   CHANGE COLOR
===================================================== */

export function changeColor(masterData, currentProduct, colorProduct) {

    if (!masterData) return null;

    const sku =

        normalize(colorProduct.searchName);

    const sizes =

        masterData.index.sku[sku] || [];

    const found = sizes.find(

        item =>

            normalize(item.size) ===

            normalize(currentProduct.size)

    );

    return found || sizes[0] || null;

}

/* =====================================================
   CHANGE SIZE
===================================================== */

export function changeSize(masterData, currentProduct, size) {

    if (!masterData) return null;

    const list =

        masterData.index.sku[

            normalize(currentProduct.searchName)

        ] || [];

    return (

        list.find(

            item =>

                normalize(item.size) ===

                normalize(size)

        ) || null

    );

}

/* =====================================================
   GET PRODUCT BY BARCODE
===================================================== */

export function getProductByBarcode(masterData, barcode) {

    return (

        masterData.index.barcode[

            normalize(barcode)

        ] || null

    );

}

/* =====================================================
   GET PRODUCT BY ITEM NUMBER
===================================================== */

export function getProductByItemNumber(masterData, itemNumber) {

    return (

        masterData.index.itemNumber[

            normalize(itemNumber)

        ] || null

    );

}

/* =====================================================
   GET PRODUCT BY SEARCH NAME
===================================================== */

export function getProductBySku(masterData, sku) {

    const list =

        masterData.index.sku[

            normalize(sku)

        ] || [];

    return list[0] || null;

}

export function getSkuTotalStock(masterData, product) {

    if (!masterData || !product) {

        return 0;

    }

    const list =
        masterData.index.sku[
            normalize(product.searchName)
        ] || [];

    return list.reduce(

        (total, item) =>

            total + Number(item.stock || 0),

        0

    );

}
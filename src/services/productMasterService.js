function normalize(text = "") {
    return String(text)
        .trim()
        .toLowerCase();
}

export function generateProductMaster(sohData) {

    const products = [];

    const barcodeIndex = {};
    const itemNumberIndex = {};
    const searchNameIndex = {};
    const skuIndex = {};
    const modelIndex = {};
    const colorIndex = {};
    const sizeIndex = {};

    sohData.forEach((row) => {

        const searchName = String(
            row["Search name"] || ""
        ).trim();

        const split = searchName.split("-");

        const modelCode = split[0] || "";

        const colorCode = split.slice(1).join("-");

        const product = {

            //--------------------------------
            // Basic
            //--------------------------------

            itemNumber: String(
                row["Item number"] || ""
            ).trim(),

            barcode: String(
                row["Barcode"] || ""
            ).trim(),

            searchName,

            modelCode,

            colorCode,

            //--------------------------------
            // Product
            //--------------------------------

            productName: String(
                row["Product name"] || ""
            ).trim(),

            brand: String(
                row["Brand"] || ""
            ).trim(),

            //--------------------------------
            // Variant
            //--------------------------------

            size: String(
                row["Size"] || ""
            ).trim(),

            color: String(
                row["Color"] || ""
            ).trim(),

            //--------------------------------
            // Inventory
            //--------------------------------

            price: Number(
                row["PRICE"] || 0
            ),

            stock: Number(
                row["Physical inventory"] || 0
            ),

            available: Number(
                row["available physical"] || 0
            ),

            totalAvailable: Number(
                row["Total available"] || 0
            ),

            //--------------------------------
            // Warehouse
            //--------------------------------

            warehouse: String(
                row["Warehouse"] || ""
            ).trim(),

            location: String(
                row["location"] || ""
            ).trim(),

            crcLocation: String(
                row["CRC_Location_Name"] || ""
            ).trim(),

            //--------------------------------
            // Information
            //--------------------------------

            style: String(
                row["Style"] || ""
            ).trim(),

            season: String(
                row["Season"] || ""
            ).trim(),

            division: String(
                row["Division"] || ""
            ).trim(),

            category: String(
                row["Category"] || ""
            ).trim(),

            subCategory: String(
                row["Sub-Category"] || ""
            ).trim(),

            gender: String(
                row["Gender"] || ""
            ).trim(),

            collection: String(
                row["Collection"] || ""
            ).trim(),

            itemGroup: String(
                row["Item group"] || ""
            ).trim(),

            className: String(
                row["Class Name"] || ""
            ).trim(),

            subClassName: String(
                row["Sub-Class Name"] || ""
            ).trim(),

            deptName: String(
                row["Dept Name"] || ""
            ).trim(),

            subDeptName: String(
                row["Sub-Dept Name"] || ""
            ).trim()

        };

        products.push(product);

        // ==========================
        // Barcode
        // ==========================

        barcodeIndex[
            normalize(product.barcode)
        ] = product;

        // ==========================
        // Item Number
        // ==========================

        itemNumberIndex[
            normalize(product.itemNumber)
        ] = product;

        // ==========================
        // Search Name
        // ==========================

        const searchKey =
            normalize(product.searchName);

        if (!searchNameIndex[searchKey]) {

            searchNameIndex[searchKey] = [];

        }

        searchNameIndex[searchKey].push(product);

        // ==========================
        // SKU
        // 1175851-BLK
        // ==========================

        if (!skuIndex[searchKey]) {

            skuIndex[searchKey] = [];

        }

        skuIndex[searchKey].push(product);

        // ==========================
        // Model
        // 1175851
        // ==========================

        const modelKey =
            normalize(product.modelCode);

        if (!modelIndex[modelKey]) {

            modelIndex[modelKey] = [];

        }

        modelIndex[modelKey].push(product);

        // ==========================
        // Color
        // BLK + USM
        // ==========================

        const colorKey =
            searchKey +
            "|" +
            normalize(product.size);

        if (!colorIndex[colorKey]) {

            colorIndex[colorKey] = [];

        }

        colorIndex[colorKey].push(product);

        // ==========================
        // Size
        // BLK
        // ==========================

        const sizeKey =
            searchKey +
            "|" +
            normalize(product.color);

        if (!sizeIndex[sizeKey]) {

            sizeIndex[sizeKey] = [];

        }

        sizeIndex[sizeKey].push(product);

    });

    //---------------------------------------
    // Sort Size
    //---------------------------------------

    Object.values(sizeIndex).forEach(list => {

        list.sort((a, b) =>

            a.size.localeCompare(

                b.size,

                undefined,

                {

                    numeric: true

                }

            )

        );

    });

    //---------------------------------------

    return {

        version: 4,

        createdAt: new Date().toLocaleString(),

        totalProducts: products.length,

        products,

        index: {

            barcode: barcodeIndex,

            itemNumber: itemNumberIndex,

            searchName: searchNameIndex,

            sku: skuIndex,

            model: modelIndex,

            color: colorIndex,

            size: sizeIndex

        }

    };

}
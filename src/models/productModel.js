export default {
    fetchColorCodes: async () => {
        try {
            const response = await fetch('https://draft.grebban.com/backend/attribute_meta.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const colorCodes = data.find(attr => attr.name === "Color");
            if (!colorCodes) {
                throw new Error("Color attribute not found.");
            }
            // get the values
            //const colorValues = colorCodes.values;
            return colorCodes.values;
            //res.status(200).json(colorCodes.values);
        } catch (error) {
            console.error('Error fetching color codes:', error.message);
            res.status(500).json({ message: 'Failed to retrieve color codes', error: error.message });
        }
    },
    fetchCategoryCodes: async () => {
        try {
            const response = await fetch('https://draft.grebban.com/backend/attribute_meta.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const categoryCodes = data.find(attr => attr.name === "Category");
            if (!categoryCodes) {
                throw new Error("Category attribute not found.");
            }
            // get the values
            //const colorValues = colorCodes.values
            console.log(categoryCodes)
            return categoryCodes.values;
            //res.status(200).json(colorCodes.values);
        } catch (error) {
            console.error('Error fetching color codes:', error.message);
            res.status(500).json({ message: 'Failed to retrieve color codes', error: error.message });
        }
    },
    transformProduct: async (product, colorCodes, categories) => {
        const transformedAttributes = [];
        console.log(product)
        // Handle color mapping
        if (product.attributes.color) {
            const colors = product.attributes.color.split(',');
            colors.forEach(colorCode => {
                const color = colorCodes.find(c => c.code === colorCode.trim());
                if (color) {
                    transformedAttributes.push({ name: 'Color', value: color.name });
                }
            });

        if (product.attributes.cat) {
            const categoryCodes = product.attributes.cat.split(',');
            categoryCodes.forEach(catCode => {
                const category = categories.find(c => c.code === catCode.trim());
                if (category) {
                    const parentCategory = categories.find(c => catCode.startsWith(c.code) && c.code !== catCode);
                    const categoryHierarchy = parentCategory ? `${parentCategory.name} > ${category.name}` : category.name;
                    transformedAttributes.push({ name: 'Category', value: categoryHierarchy });
                }
            });
        }
        }

        return {
            id: product.id,
            name: product.name,
            attributes: transformedAttributes
        };
    },
    fetchProducts: async (page, pageSize) => {
        //logic here
        try {
            const response = await fetch('https://draft.grebban.com/backend/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const products = await response.json();
            //Pagnation
            //console.log(products)
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            const paginatedProducts = products.slice(startIndex, endIndex);
            const totalPages = Math.ceil(products.length / pageSize);
            paginatedProducts.totalPages = totalPages;
            return paginatedProducts;
            //res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
        }
    }
}
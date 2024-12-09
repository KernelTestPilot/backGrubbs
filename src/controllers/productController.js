import productModel from "../models/productModel.js";

export default {
    getColorCodes: async(req,res) =>{
        try {
            const colorCodes = await productModel.fetchColorCodes();
            res.status(200).json(colorCodes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve color codes', error: error.message });
        }
    },
    getCategoryCodes: async(req,res) =>{
        try {
            const categoryCodes = await productModel.fetchCategoryCodes();
            res.status(200).json(categoryCodes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve category codes', error: error.message });
        }
    },

    getAllProducts: async (req, res) => {
        //logic here
        try {
            const page = parseInt(req.query.page, 10) || 1; // Default to page 1
            const pageSize = parseInt(req.query.page_size, 10) || 2; // Default to 2 products per page
            const colorCodes = await productModel.fetchColorCodes();
            const categoryCodes = await productModel.fetchCategoryCodes();

            const result = await productModel.fetchProducts(page, pageSize);
            const transformedPromises = result.map(async (product) => {
                return await productModel.transformProduct(product,colorCodes,categoryCodes); // Assuming transformProduct is asynchronous
            });
    
            // Resolve all promises
            const transformedProducts = await Promise.all(transformedPromises);
    
            // Resolve all promises
            //const transformedProducts = await Promise.all(transformedPromises);            
            //console.log(transformedProducts)
            console.log(result)
            res.status(200).json({
                products: transformedProducts,
                page,
                totalPages: result.totalPages,
            });
        
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
        }
    },
};
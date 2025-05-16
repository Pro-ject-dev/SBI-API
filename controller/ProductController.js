const { where } = require('sequelize');
const productModel = require('../models/products');

exports.getproduct = async (req, res) => {
    try {
        const  isStandard  = req.query.isStandard;
        const productData = await productModel.findAll({
            where: {
                status: 1,
                isStandard: isStandard
            }
        });
         console.log(productData);
         res.status(200).json({status:true, data:productData});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.getproductbyId = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ status: false, error: 'Product ID is required' });
        }
        const productData = await productModel.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        if (!productData) {
            return res.status(404).json({ status: false, error: 'Product not found' });
        }
        console.log(productData);
        res.status(200).json({ status: true, data: productData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: err });
    }
};




exports.addproduct = async (req, res) => {
    try {
        const { date, productName, ratePerQuantity, grade,weightOfObject, length, width, thickness, maxCost, gst, totalAmount, remark, maxSqIn, isStandard } = req.body;
        const insertData = await productModel.create({
            date,
            productName,
            ratePerQuantity,
            grade,
            weightOfObject,
            length,
            width,
            thickness,
            maxCost,
            gst,
            totalAmount,
            remark,
            maxSqIn,
            isStandard,
            status: 1
        });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Products Added Successful!" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


exports.editproduct = async (req, res) => {
    try {
        const {
            id,
            productName,
            ratePerQuantity,
            grade,
            weightOfObject,
            length,
            width,
            thickness,
            maxCost,
            gst,
            totalAmount,
            remark,
            maxSqIn,
            isStandard
        } = req.body;

        const editData = await productModel.update(
            {
                productName,
                ratePerQuantity,
                grade,
                weightOfObject,
                length,
                width,
                thickness,
                maxCost,
                gst,
                totalAmount,
                remark,
                maxSqIn,
                isStandard,
                status: 1
            },
            {
                where: {
                    id: id
                }
            }
        );

        console.log(editData);
        res.status(200).json({
            status: true,
            message: "Product updated successfully!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: err.message });
    }
};



exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await productModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Product Deleted Successfully !" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ status: false, error: err.message });
    }

}
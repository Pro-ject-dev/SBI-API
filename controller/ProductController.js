const { where } = require('sequelize');
const productModel = require('../models/products');

exports.getproduct = async (req, res) => {
    try {
        const productData = await productModel.findAll({where:{status:1}});
        console.log(productData);
        res.json(productData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.addproduct = async (req, res) => {
    try {
        const { date, productname, rate_per_piece, grade, length, width, thickness, maxcost, gst, totalamount, remark, maxsq_in, isstandard } = req.body;
        const insertData = await productModel.create({
            date,
            productname,
            rate_per_piece,
            grade,
            length,
            width,
            thickness,
            maxcost,
            gst,
            totalamount,
            remark,
            maxsq_in,
            isstandard,
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
            productname,
            rate_per_piece,
            grade,
            length,
            width,
            thickness,
            maxcost,
            gst,
            totalamount,
            remark,
            maxsq_in,
            isstandard
        } = req.body;

        const editData = await productModel.update(
            {
                productname,
                rate_per_piece,
                grade,
                length,
                width,
                thickness,
                maxcost,
                gst,
                totalamount,
                remark,
                maxsq_in,
                isstandard,
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
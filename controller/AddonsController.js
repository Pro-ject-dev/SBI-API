const { where } = require('sequelize');
const AddonsModel = require('../models/addons');

exports.getAddons = async (req, res) => {
    try {
        const AddonsData = await AddonsModel.findAll({ where: { status: 1 } });
        console.log(AddonsData);
        res.json(AddonsData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.addAddons = async (req, res) => {
    try {
        const { date, name, ratePerKg, grade,weightOfObject, length, width, thickness, maxCost, gst, totalAmount, remark, minSqIn } = req.body;
        const insertData = await AddonsModel.create({
            date,
            name,
            ratePerKg,
            grade,
            weightOfObject,
            length,
            width,
            thickness,
            maxCost,
            gst,
            totalAmount,
            remark,
            minSqIn,
            status: 1
        });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Addons Added Successful!" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}


exports.editAddons = async (req, res) => {
    try {
        const {
            id,
            name,
            ratePerKg,
            grade,
            weightOfObject,
            length,
            width,
            thickness,
            maxCost,
            gst,
            totalamount,
            remark,
            minSqIn,
        } = req.body;

        const editData = await AddonsModel.update(
            {
                name,
                ratePerKg,
                grade,
                weightOfObject,
                length,
                width,
                thickness,
                maxCost,
                gst,
                totalamount,
                remark,
                minSqIn,
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
            message: "Addons updated successfully!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: err.message });
    }
};



exports.deleteAddons = async (req, res) => {
    try {
        const { id } = req.body;
        await AddonsModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Addons Deleted Successfully !" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ status: false, error: err.message });
    }

}
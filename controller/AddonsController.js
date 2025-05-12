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
        const { date, name, rate_per_kg, grade, length, width, thickness, maxcost, gst, total_amount, remark, min_sqin, isstandard } = req.body;
        const insertData = await AddonsModel.create({
            date,
            name,
            rate_per_kg,
            grade,
            length,
            width,
            thickness,
            maxcost,
            gst,
            total_amount,
            remark,
            min_sqin,
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
            rate_per_kg,
            grade,
            length,
            width,
            thickness,
            maxcost,
            gst,
            totalamount,
            remark,
            min_sqin,
        } = req.body;

        const editData = await AddonsModel.update(
            {
                name,
                rate_per_kg,
                grade,
                length,
                width,
                thickness,
                maxcost,
                gst,
                totalamount,
                remark,
                min_sqin,
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
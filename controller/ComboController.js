const ComboModel = require("../models/combo");

exports.addCombo = async (req, res) => {
    try {
        const { name } = req.body;
        const insertData = await ComboModel.create({ name, status: 1 });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Combo Added Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }

}

exports.getCombo = async (req, res) => {
    try {
        const comboData = await ComboModel.findAll({ where: { status: 1 } });
        res.status(200).json({ status: true, data: comboData });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}


exports.deleteCombo = async (req, res) => {
    try {
        const { id } = req.body;
        await ComboModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Combo Deleted Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
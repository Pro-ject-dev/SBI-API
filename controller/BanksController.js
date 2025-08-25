const { where } = require('sequelize');
const BanksModel = require('../models/banks');

exports.addBank = async (req, res) => {
    try {
        const { title,acName, acType, ifscCode, bankName, acNumber, micrCode } = req.body;
        const insertData = await BanksModel.create({
            title,
            acName,
            acType,
            ifscCode,
            bankName,
            acNumber,
            micrCode, 
            status: 1
        });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Bank Added Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error });
    }

}

exports.getBank = async (req, res) => {
    try {
        const BankData = await BanksModel.findAll({ where: { status: 1 } });
        console.log(BankData);
        res.status(200).json({ status: true, data: BankData });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }

}


exports.getBankbyId = async (req, res) => {
    try {
        const { id } = req.query;
        const BankData = await BanksModel.findOne({ where: { id: id, status: 1 } });
        console.log(BankData);
        res.status(200).json({ status: true, data: BankData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error });
    }
}


exports.editBank = async (req, res) => {
    try {
        const { id,title, acName, acType, ifscCode, bankName, acNumber, micrCode } = req.body;
        const editData = await BanksModel.update({
            title,
            acName,
            acType,
            ifscCode,
            bankName,
            acNumber,
            micrCode
        }, { where: { id: id } });
        console.log(editData);
        res.status(200).json({ status: true, message: "Bank Updated Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).s
    }
}


exports.deleteBank = async (req, res) => {
    try {
        const { id } = req.body;
        await BanksModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Bank Deleted Successfully !" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: true, mess: error })
    }

}
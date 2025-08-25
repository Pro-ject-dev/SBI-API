const { where } = require('sequelize');
const termsModel = require('../models/terms');

exports.addTerms = async (req, res) => {
    try {
        const { title, description } = req.body;
        const insertData = await termsModel.create({
            title,
            description,
            status: 1
        });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Terms Added Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error });
    }

}

exports.getTerms = async (req, res) => {
    try {
        const TermsData = await termsModel.findAll({ where: { status: 1 } });
        console.log(TermsData);
        res.status(200).json({ status: true, data: TermsData });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }

}

exports.getTermsbyId = async (req, res) => {
    try {
        const { id } = req.query;
        const TermsData = await termsModel.findOne({ where: { id: id ,status:1} });
        console.log(TermsData);
        res.status(200).json({ status: true, data: TermsData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error });
    }
}


exports.editTerms = async (req, res) => {
    try {
        const { id, title, description } = req.body;
        const editData = await termsModel.update({
            title,
           description
        }, { where: { id: id } });
        console.log(editData);
        res.status(200).json({ status: true, message: "Terms Updated Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).s
    }
}


exports.deleteTerms = async (req, res) => {
    try {
        const { id } = req.body;
        await termsModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Terms Deleted Successfully !" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: true, message: error })
    }

}
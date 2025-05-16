const CategoryModel = require("../models/category");


exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const insertData = await CategoryModel.create({ name, status: 1 });
        console.log(insertData);
        res.status(200).json({ status: true, message: "Category Added Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }

}

exports.getCategory = async (req, res) => {
    try {
        const categoryData = await CategoryModel.findAll({ where: { status: 1 } });
        res.status(200).json({ status: true, data: categoryData });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        await CategoryModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Category Deleted Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
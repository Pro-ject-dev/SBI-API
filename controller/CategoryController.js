const CategoryModel = require("../models/category");
const ComboMappingModel = require("../models/combomapping");
const ComboModel = require("../models/combo");
const { Op, fn, col, where } = require("sequelize");

ComboMappingModel.belongsTo(CategoryModel, {
    foreignKey: "catId",
});

ComboMappingModel.belongsTo(ComboModel, {
    foreignKey: "comboId",
});

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


exports.getCategorybyCombo = async (req, res) => {
    try {
        const { comboId } = req.query;

        const comboMappings = await ComboMappingModel.findAll({
            where: { status: 1, comboId },
            include: [
                {
                    model: CategoryModel,
                    attributes: ['id', 'name']
                }
            ]
        });

        const uniqueCategoriesMap = new Map();

        comboMappings.forEach(mapping => {
            if (mapping.category && !uniqueCategoriesMap.has(mapping.category.id)) {
                uniqueCategoriesMap.set(mapping.category.id, mapping.category);
            }
        });

        const uniqueCategories = Array.from(uniqueCategoriesMap.values());

        res.status(200).json({ status: true, data: uniqueCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
};



exports.getCategorybyStr = async (req, res) => {
  try {
    let { searchStr } = req.query;

    const whereCondition = {
      status: 1,
    };
    if (searchStr && searchStr.trim() !== "") {
      searchStr = searchStr.replace(/\s+/g, "").toLowerCase();
      whereCondition[Op.and] = [
        where(
          fn('REPLACE', fn('LOWER', col('name')), ' ', ''),
          {
            [Op.like]: `%${searchStr}%`
          }
        )
      ];
    }

    const categories = await CategoryModel.findAll({
      where: whereCondition,
      attributes: ['id', 'name']
    });

    res.status(200).json({ status: true, data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};



exports.isCategoryExists = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ status: false, message: "Category name is required" });
        }

        const cleanedName = name.replace(/\s+/g, "").toLowerCase();

        const categoryExists = await CategoryModel.findOne({
            where: {
                status: 1,
                [Op.and]: [
                    where(
                        fn('REPLACE', fn('LOWER', col('name')), ' ', ''),
                        cleanedName
                    )
                ]
            }
        });

        if (categoryExists) {
            return res.status(200).json({ status: true, message: "Category already exists" });
        } else {
            return res.status(200).json({ status: false, message: "Category does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
};



exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        await CategoryModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Category Deleted Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
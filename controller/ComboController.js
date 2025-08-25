const ComboModel = require("../models/combo");
const { Op, fn, col, where } = require("sequelize");

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



exports.isComboExists = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ status: false, message: "Combo name is required" });
        }

        const cleanedName = name.replace(/\s+/g, "").toLowerCase();

        const comboExists = await ComboModel.findOne({
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

        if (comboExists) {
            return res.status(200).json({ status: true, message: "Combo already exists" });
        } else {
            return res.status(200).json({ status: false, message: "Combo does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
};


exports.getCombobyStr = async (req, res) => {
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

    const combos = await ComboModel.findAll({
      where: whereCondition,
      attributes: ['id', 'name']
    });

    res.status(200).json({ status: true, data: combos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
  }
};


exports.deleteCombo = async (req, res) => {
    try {
        const { id } = req.body;
        await ComboModel.update({ status: 0 }, { where: { id: id } });
        res.status(200).json({ status: true, message: "Combo Deleted Successfully !" });
    } catch (error) {
        res.status(500).json({ status: false, message: error });
    }
}
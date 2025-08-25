const { min, add } = require('lodash');
const AddonsModel = require('../models/addons');
const { Op, fn, col, where,literal } = require("sequelize");

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
        const { date, name, ratePerKg, grade,weightOfObject, length, width, thickness,minCost, maxCost,remark} = req.body;
        const insertData = await AddonsModel.create({
            date,
            name,
            ratePerKg,
            grade,
            weightOfObject,
            length,
            width,
            thickness,
            minCost,
            maxCost,
            remark,
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
            minCost,
            maxCost,
            remark,
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
                minCost,
                maxCost,
                remark,
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



exports.isAddonsExists = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ status: false, message: "Addons name is required" });
        }

        const cleanedName = name.replace(/\s+/g, "").toLowerCase();

        const addonsExists = await AddonsModel.findOne({
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

        if (addonsExists) {
            return res.status(200).json({ status: true, message: "Addons already exists" });
        } else {
            return res.status(200).json({ status: false, message: "Addons does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
};



exports.getaddonsbyId = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.status(400).json({ status: false, error: 'Addons ID is required' });
        }
        const addonsData = await AddonsModel.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        if (!addonsData) {
            return res.status(404).json({ status: false, error: 'Addons not found' });
        }
        console.log(addonsData);
        res.status(200).json({ status: true, data: addonsData});
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: err });
    }
};


exports.getAddonsByFilter = async (req, res) => {
  try {
    const {
      page = 1,
      size = 10,
      productName = "",
      startDate,
      endDate,
      grade
    } = req.query;

    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    // Base where clause
    const whereClause = {
      status: 1
    };

    // Filter by name
    if (productName) {
      whereClause.name = {
        [Op.like]: `%${productName}%`
      };
    }

    // Filter by grade
    if (grade) {
      whereClause.grade = grade;
    }

    // Filter by date (assuming createdDate is a string column in YYYY-MM-DD format)
    if (startDate || endDate) {
      if (!whereClause[Op.and]) whereClause[Op.and] = [];

      if (startDate) {
        whereClause[Op.and].push(
          literal(`STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE('${startDate}', '%Y-%m-%d')`)
        );
      }

      if (endDate) {
        whereClause[Op.and].push(
          literal(`STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE('${endDate}', '%Y-%m-%d')`)
        );
      }
    }

    // Fetch from DB
    const addons = await AddonsModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["id", "DESC"]]
    });

    res.status(200).json({
      status: true,
      message: "Addons fetched successfully",
      data: addons.rows,
      total: addons.count,
      page: parseInt(page),
      size: parseInt(size)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
};


exports.getAddonsbyStr = async (req, res) => {
  try {
    let { searchStr } = req.query;

    const whereCondition = {
      status: 1,
    };
    if (searchStr && searchStr.trim() !== "") {
      searchStr = searchStr.replace(/\s+/g, "").toLowerCase();
      whereCondition[Op.and] = [
        where(fn("REPLACE", fn("LOWER", col("name")), " ", ""), {
          [Op.like]: `%${searchStr}%`,
        }),
      ];
    }

    const products = await AddonsModel.findAll({
      where: whereCondition,
      attributes: ["id", "name"],
    });

    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};


exports.incrementDecrementAddonsCost = async (req, res) => {
  try {
    const { ids, percentage } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ status: false, message: "No product IDs provided" });
    }

    if (typeof percentage !== 'number') {
      return res.status(400).json({ status: false, message: "Percentage must be a number" });
    }

    const addons= await AddonsModel.findAll({
      where: { id: ids }
    });

    if (addons.length === 0) {
      return res.status(404).json({ status: false, message: "No addons found for given IDs" });
    }

    const updatedProducts = [];

    for (const product of addons) {
      const multiplier = 1 + (percentage / 100); 

      product.ratePerKg = +(product.ratePerKg * multiplier).toFixed(2);
      product.minCost = +(product.minCost * multiplier).toFixed(2);
      product.maxCost = +(product.maxCost * multiplier).toFixed(2);

      await product.save(); 
      updatedProducts.push(product);
    }

    return res.json({
      status: true,
      message: "Addons updated successfully",
      data: updatedProducts,
    });

  } catch (err) {
    console.error("Error incrementing product cost:", err);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message,
    });
  }
};





exports.deleteAddons = async (req, res) => {
    try {
        const { ids } = req.body;
        await AddonsModel.update({ status: 0 }, { where: { id: ids } });
        res.status(200).json({ status: true, message: "Addons Deleted Successfully !" });
    } catch (error) {
        console.error(err);
        res.status(500).json({ status: false, error: err.message });
    }

}
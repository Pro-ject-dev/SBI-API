const combomappingModel = require('../models/combomapping');
const productModel = require('../models/products');
const cateoryModel = require('../models/category');
const comboModel = require('../models/combo');
const { Op, fn, col, where ,  literal} = require("sequelize");

combomappingModel.belongsTo(productModel, {
    foreignKey: "productId",
});

combomappingModel.belongsTo(cateoryModel, {
    foreignKey: "catId",
});

combomappingModel.belongsTo(comboModel, {
    foreignKey: "comboId",
});

exports.addComboMapping = async (req, res) => {
    try {
        const { date, productId, catId, comboId } = req.body;

        if (!Array.isArray(productId) || productId.length === 0) {
            return res.status(400).json({ status: false, message: "productId must be a non-empty array" });
        }

        const insertPromises = productId.map(pid =>
            combomappingModel.create({ date, productId: pid, catId, comboId, status: 1 })
        );

        const insertData = await Promise.all(insertPromises);

        res.status(201).json({
            status: true,
            message: "Combo mappings added successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
};


exports.deleteComboMapping = async (req, res) => {
    try {
        const { id } = req.body; 
        if (!Array.isArray(id) || id.length === 0) {
            return res.status(400).json({ status: false, message: "Invalid or empty id array" });
        }
        await combomappingModel.update(
            { status: 0 },
            {
                where: {
                    id: {
                        [Op.in]: id
                    }
                }
            }
        );
        res.status(200).json({ status: true, message: "Combo(s) deleted successfully" });
    } catch (error) {
        console.error("Delete Combo Error:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};


exports.getComboMapping = async (req, res) => {
  try {
    const {
      catId,
      comboId,
      startDate,
      endDate,
      productStr,
      grade,
      page,
      size
    } = req.body;

    const parsedLimit = parseInt(size);
    const parsedPage = parseInt(page);
    const offset = (parsedPage - 1) * parsedLimit;

    const whereClause = { status: 1 };
    const andConditions = [];

    if (catId) whereClause.catId = catId;
    if (comboId) whereClause.comboId = comboId;

    if (startDate) {
      andConditions.push(
        literal(`STR_TO_DATE(Mapping.date, '%Y-%m-%d') >= STR_TO_DATE('${startDate}', '%Y-%m-%d')`)
      );
    }

    if (endDate) {
      andConditions.push(
        literal(`STR_TO_DATE(Mapping.date, '%Y-%m-%d') <= STR_TO_DATE('${endDate}', '%Y-%m-%d')`)
      );
    }

    if (andConditions.length > 0) {
      whereClause[Op.and] = andConditions;
    }

    const productWhere = {};
    if (productStr?.trim()) {
      productWhere.productName = { [Op.like]: `%${productStr.trim()}%` };
    }
    if (grade) {
      productWhere.grade = grade;
    }

    // Build query options
    const queryOptions = {
      where: whereClause,
      include: [
        {
          model: productModel,
          as: 'Product',
          attributes: ['id', 'productName', 'date', 'grade', 'ratePerQuantity'],
          where: Object.keys(productWhere).length > 0 ? productWhere : undefined
        },
        {
          model: cateoryModel,
          attributes: ['id', 'name'],
        },
        {
          model: comboModel,
          attributes: ['id', 'name']
        }
      ],
      order: [['id', 'DESC']]
    };

    // Add pagination only if both page and size are provided
    const applyPagination = !isNaN(parsedPage) && !isNaN(parsedLimit);
    if (applyPagination) {
      queryOptions.limit = parsedLimit;
      queryOptions.offset = offset;
    }

    const { count, rows } = await combomappingModel.findAndCountAll(queryOptions);

    const transformedData = rows.map(row => {
      const rowData = row.toJSON();
      if (rowData.Product) {
        rowData.product = rowData.Product;
        delete rowData.Product;
      }
      return rowData;
    });

    const response = {
      status: true,
      message: "Combo mappings fetched successfully",
      data: transformedData,
    };

    if (applyPagination) {
      response.pagination = {
        totalRecords: count,
        totalPages: Math.ceil(count / parsedLimit),
        currentPage: parsedPage,
        pageSize: parsedLimit
      };
    }

    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch combo mappings",
      error: error.message
    });
  }
};

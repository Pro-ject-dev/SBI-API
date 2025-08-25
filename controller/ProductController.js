const productModel = require("../models/products");
const addonsModel = require("../models/addons");
const ComboMappingModel = require("../models/combomapping");
const { Op, fn, col, where ,  literal} = require("sequelize");

ComboMappingModel.belongsTo(productModel, {
  foreignKey: "productId",
});

exports.getproduct = async (req, res) => {
  try {
    const { isStandard } = req.query;

    const whereClause = { status: 1 };
    if (isStandard !== undefined) {
      whereClause.isStandard = isStandard;
    }

    const productData = await productModel.findAll({
      where: whereClause,
    });

    res.status(200).json({ status: true, data: productData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProductbyStr = async (req, res) => {
  try {
    let { searchStr, isStandard } = req.query;

    const whereCondition = {
      status: 1,
    };
    if (searchStr && searchStr.trim() !== "") {
      searchStr = searchStr.replace(/\s+/g, "").toLowerCase();
      whereCondition[Op.and] = [
        where(fn("REPLACE", fn("LOWER", col("productName")), " ", ""), {
          [Op.like]: `%${searchStr}%`,
        }),
      ];
    }

    if (!["undefined", undefined, null, ""].includes(isStandard)) {
      whereCondition.isStandard = parseInt(isStandard);
    }

    const products = await productModel.findAll({
      where: whereCondition,
      attributes: ["id", "productName", "isStandard"],
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


exports.isProductExists = async (req, res) => {
  try {
    let { productName } = req.query;

    if (!productName) {
      return res
        .status(400)
        .json({ status: false, message: "Product name is required" });
    }

    const cleanedName = productName.replace(/\s+/g, "").toLowerCase();

    const productExists = await productModel.findOne({
      where: {
        status: 1,
        [Op.and]: [
          where(
            fn("REPLACE", fn("LOWER", col("productName")), " ", ""),
            cleanedName
          ),
        ],
      },
    });

    const addonsExists = await addonsModel.findOne({
      where:{
        status:1,
        [Op.and]:[
           where(
            fn("REPLACE", fn("LOWER", col("name")), " ", ""),
            cleanedName
          ),
        ]
      }
    })

    if (productExists || addonsExists) {
      return res
        .status(200)
        .json({ status: true, message: "Product already exists" });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Product does not exist" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error",
      });
  }
};

exports.getProductbyComboAndCategory = async (req, res) => {
  try {
    const { comboId, catId } = req.body;
    const { isStandard } = req.query;

    const comboMappings = await ComboMappingModel.findAll({
      where: { status: 1, comboId: comboId, catId: catId },
      include: [
        {
          model: productModel,
          attributes: [
            "id",
            "productName",
            "ratePerQuantity",
            "grade",
            "weightOfObject",
            "length",
            "width",
            "thickness",
            "minCost",
            "maxCost",
            "remark",
            "isStandard",
          ],
          where: { isStandard: isStandard },
        },
      ],
    });

    const products = comboMappings
      .map((mapping) => mapping.Product)
      .filter((prod) => prod !== null);
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error",
      });
  }
};

exports.getproductbyId = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res
        .status(400)
        .json({ status: false, error: "Product ID is required" });
    }
    const productData = await productModel.findOne({
      where: {
        id: id,
        status: 1,
      },
    });
    if (!productData) {
      return res
        .status(404)
        .json({ status: false, error: "Product not found" });
    }
    console.log(productData);
    res.status(200).json({ status: true, data: productData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err });
  }
};

exports.addproduct = async (req, res) => {
  try {
    const {
      date,
      productName,
      ratePerQuantity,
      grade,
      weightOfObject,
      length,
      width,
      thickness,
      minCost,
      maxCost,
      remark,
      isStandard,
    } = req.body;
    const insertData = await productModel.create({
      date,
      productName,
      ratePerQuantity,
      grade,
      weightOfObject,
      length,
      width,
      thickness,
      minCost,
      maxCost,
      remark,
      isStandard,
      status: 1,
    });
    console.log(insertData);
    res
      .status(200)
      .json({ status: true, message: "Products Added Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.editproduct = async (req, res) => {
  try {
    const {
      id,
      productName,
      ratePerQuantity,
      grade,
      weightOfObject,
      length,
      width,
      thickness,
      minCost,
      maxCost,
      remark,
      isStandard,
    } = req.body;

    const editData = await productModel.update(
      {
        productName,
        ratePerQuantity,
        grade,
        weightOfObject,
        length,
        width,
        thickness,
        minCost,
        maxCost,
        remark,
        isStandard,
        status: 1,
      },
      {
        where: {
          id: id,
        },
      }
    );

    console.log(editData);
    res.status(200).json({
      status: true,
      message: "Product updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.incrementDecrementProductCost = async (req, res) => {
  try {
    const { ids, percentage } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ status: false, message: "No product IDs provided" });
    }

    if (typeof percentage !== 'number') {
      return res.status(400).json({ status: false, message: "Percentage must be a number" });
    }

    const products = await productModel.findAll({
      where: { id: ids }
    });

    if (products.length === 0) {
      return res.status(404).json({ status: false, message: "No products found for given IDs" });
    }

    const updatedProducts = [];

    for (const product of products) {
      const multiplier = 1 + (percentage / 100); 

      product.ratePerQuantity = +(product.ratePerQuantity * multiplier).toFixed(2);
      product.minCost = +(product.minCost * multiplier).toFixed(2);
      product.maxCost = +(product.maxCost * multiplier).toFixed(2);

      await product.save(); 
      updatedProducts.push(product);
    }

    return res.json({
      status: true,
      message: "Products updated successfully",
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


exports.deleteProduct = async (req, res) => {
  try {
    const { ids } = req.body; 

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ status: false, message: "No product IDs provided" });
    }

    await productModel.update(
      { status: 0 },
      {
        where: {
          id: ids
        }
      }
    );

    res.status(200).json({ status: true, message: "Products Deleted Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.getProductsByFilter = async (req, res) => {
  try {
    const {
      isStandard,
      page = 1,
      size = 10,
      productName,
      startDate,
      endDate,
      grade
    } = req.query;

    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const whereCondition = {
      status: 1
    };

    // Filter by isStandard
    if (isStandard !== undefined && isStandard) {
      whereCondition.isStandard = isStandard;
    }

    if(grade!==undefined && grade){
      whereCondition.grade=grade;
    }

    // Filter by productName (ignore spaces and lowercase)
    if (productName && productName.trim() !== "") {
      const searchStr = productName.replace(/\s+/g, "").toLowerCase();

      if (!whereCondition[Op.and]) whereCondition[Op.and] = [];

      whereCondition[Op.and].push(
        where(
          fn("REPLACE", fn("LOWER", col("productName")), " ", ""),
          {
            [Op.like]: `%${searchStr}%`
          }
        )
      );
    }

    // Filter by startDate and endDate on string-based 'createdDate' field
    if (startDate || endDate) {
      if (!whereCondition[Op.and]) whereCondition[Op.and] = [];

      if (startDate) {
        whereCondition[Op.and].push(
          literal(`STR_TO_DATE(date, '%Y-%m-%d') >= STR_TO_DATE('${startDate}', '%Y-%m-%d')`)
        );
      }

      if (endDate) {
        whereCondition[Op.and].push(
          literal(`STR_TO_DATE(date, '%Y-%m-%d') <= STR_TO_DATE('${endDate}', '%Y-%m-%d')`)
        );
      }
    }

    // Fetch paginated and filtered data
    const products = await productModel.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [["id", "DESC"]]
    });

    res.status(200).json({
      status: true,
      message: "Products fetched successfully",
      data: products.rows,
      total: products.count,
      page: parseInt(page),
      size: parseInt(size)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: err.message });
  }
};



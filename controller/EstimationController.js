const { Estimation, EstProduct, EstProductAddon } = require('../models/estassociation.js');


exports.createEstimation = async (req, res) => {
  try {
    const { estimation, products } = req.body;

    const newEstimation = await Estimation.create(estimation);

    for (const product of products) {
      const newProduct = await EstProduct.create({ ...product, estId: newEstimation.id});

      if (product.addons?.length) {
        for (const addon of product.addons) {
          await EstProductAddon.create({ ...addon,productId: newProduct.id });
        }
      }
    }

    res.status(201).json({ success: true, message: 'Estimation created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getEstimationsByLeadId = async (req, res) => {
  try {
    const { leadId } = req.query;

    const estimations = await Estimation.findAll({
      where: { leadId },
      include: [{
        model: EstProduct,
        as: 'products',
        include: [{
          model: EstProductAddon,
          as: 'addons'
        }]
      }]
    });

    res.json(estimations);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




exports.updateEstimation = async (req, res) => {
  const t = await Estimation.sequelize.transaction(); 

  try {
    const { leadId } = req.query;
    const { estimation, products } = req.body;
    const [rowsUpdated] = await Estimation.update(estimation, {
      where: { leadId },
      transaction: t
    });

    if (rowsUpdated === 0) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Estimation not found or no changes made' });
    }
    const existingEstimation = await Estimation.findOne({ where: { leadId }, transaction: t });
    const existingProducts = await EstProduct.findAll({
      where: { estId: existingEstimation.id },
      transaction: t
    });

    for (const prod of existingProducts) {
      await EstProductAddon.destroy({ where: { productId: prod.id }, transaction: t });
    }

    await EstProduct.destroy({ where: { estId: existingEstimation.id }, transaction: t });
    for (const product of products) {
      const newProduct = await EstProduct.create(
        { ...product, estId: existingEstimation.id },
        { transaction: t }
      );

      if (product.addons?.length) {
        for (const addon of product.addons) {
          await EstProductAddon.create(
            { ...addon, productId: newProduct.id },
            { transaction: t }
          );
        }
      }
    }

    await t.commit(); 
    res.status(200).json({ success: true, message: 'Estimation and related products updated successfully' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.deleteEstimation = async (req, res) => {
  try {
    const { id } = req.query;

    const products = await EstProduct.findAll({ where: { estId: id } });

    for (const prod of products) {
      await EstProductAddon.destroy({ where: { productId: prod.id } });
    }

    await EstProduct.destroy({ where: { estId: id } });
    await Estimation.destroy({ where: { id } });

    res.json({ success: true, message: 'Estimation and related data deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




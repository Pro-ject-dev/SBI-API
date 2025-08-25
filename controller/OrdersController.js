const { EstProduct, EstProductAddon } = require('../models/estassociation.js');
const { Orders, Estimation, Leads,OrderRawMaterials,OrderDeadline,StockAssignment } = require('../models/ordersassociation.js');
const orderrawmaterials = require('../models/orderrawmaterials');
const orderdeadline = require('../models/orderdeadline');


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: Estimation,
          as: 'estimation',
          include: [
            {
              model: EstProduct,
              as: 'products',
              include: [
                {
                  model: EstProductAddon,
                  as: 'addons'
                }
              ]
            },
           
          ]
        },
        {
          model: Leads,
          as: 'leads'
        },
          {
          model: OrderRawMaterials,
          as: 'rawMaterials'
        },
        {
          model: OrderDeadline,
          as: 'deadline'
        },
        {
          model:StockAssignment,
          as:'assignMaterials'
        }
      ],
      order: [['id', 'DESC']]
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
};


exports.getOrdersById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const orders = await Orders.findOne({
      where: { id },
      include: [
        {
          model: Estimation,
          as: 'estimation',
          include: [
            {
              model: EstProduct,
              as: 'products',
              include: [
                {
                  model: EstProductAddon,
                  as: 'addons'
                }
              ]
            }
          ]
        },
        {
          model: Leads,
          as: 'leads'
        },
        {
              model: OrderRawMaterials,
              as: 'rawMaterials'
            },
            {
              model: OrderDeadline,
              as: 'deadline'
            },
            {
          model:StockAssignment,
          as:'assignMaterials'
        }
      ]
    });

    if (!orders) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: err.message });
  }
};




exports.updateDeadline = async (req, res) => {
  try {
    const { id } = req.query;
    const { start, end } = req.body;

    if (!id || !start || !end) {
      return res.status(400).json({ error: 'Missing required fields: id, start, or end' });
    }

    const [updatedCount] = await Orders.update(
      { deadlineStart: start, deadlineEnd: end },
      { where: { id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Order not found or already up to date" });
    }

    res.status(200).json({ success: true, message: "Deadline updated successfully!" });
  } catch (e) {
    console.error('Error updating deadline:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.createRawMaterials = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    if (!orderId || !Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'Invalid data. "orderId" and "items" array are required.' });
    }

    // Delete existing entries for orderId
    await orderrawmaterials.destroy({ where: { orderId } });

    // Create new entries
    const createdItems = await orderrawmaterials.bulkCreate(
      items.map(item => ({
        orderId,
        rawMaterial: item.rawMaterial,
        qty: item.qty,
        status: '1'
      }))
    );

    res.status(200).json({ success: true, message: 'Order raw materials replaced successfully'});

  } catch (error) {
    res.status(500).json({ success: false, message: 'Operation failed', error: error.message });
  }
};

exports.createDeadline = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    if (!orderId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid data. "orderId" and non-empty "items" array are required.' });
    }

  
    await orderdeadline.destroy({ where: { orderId } });

    const createdItems = await orderdeadline.bulkCreate(
      items.map(item => ({
        orderId,
        name: item.name,
        startAt: item.startAt || null,
        endAt: item.endAt || null,
        delayReason:item.delayReason ||null,
        status: item.status
      }))
    );

    res.status(200).json({
      success: true,
      message: 'Order deadlines replaced successfully',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Operation failed',
      error: error.message
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id ,status} = req.query;
    if (!id || !status ) {
      return res.status(400).json({ error: 'Missing required fields: id, status' });
    }

    const [updatedCount] = await Orders.update(
      { orderStatus: status, },
      { where: { id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ success: false, message: "Order not found " });
    }

    res.status(200).json({ success: true, message: "Requested RawMaterials Successfully Sended to Warehouse Team"});
  } catch (e) {
    console.error('Error updating deadline:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



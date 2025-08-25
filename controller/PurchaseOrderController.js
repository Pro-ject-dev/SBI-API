const { PurchaseOrders, PurchaseOrderItems } = require('../models/purchaseorderassociation');

exports.createOrderWithItems = async (req, res) => {
    const { orderData, items } = req.body; 

    try {
        const order = await PurchaseOrders.create(orderData);

        if (items && items.length > 0) {
            const itemsWithOrderId = items.map(item => ({
                ...item,
                purchaseId: order.id
            }));
            await PurchaseOrderItems.bulkCreate(itemsWithOrderId);
        }

        const fullOrder = await PurchaseOrders.findByPk(order.id, {
            include: { model: PurchaseOrderItems, as: 'items' }
        });

        res.status(201).json(fullOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrders.findAll({
            include: { model: PurchaseOrderItems, as: 'items' }
        });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await PurchaseOrders.findByPk(req.query.id, {
            include: { model: PurchaseOrderItems, as: 'items' }
        });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateOrder = async (req, res) => {
    const { orderData, items } = req.body;

    try {
        const order = await PurchaseOrders.findByPk(req.query.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        await order.update(orderData);

        if (items && items.length > 0) {
            await PurchaseOrderItems.destroy({ where: { purchaseId: order.id } });
            const newItems = items.map(item => ({ ...item, purchaseId: order.id }));
            await PurchaseOrderItems.bulkCreate(newItems);
        }

        const updatedOrder = await PurchaseOrder.findByPk(order.id, {
            include: { model: PurchaseOrderItems, as: 'items' }
        });

        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await PurchaseOrders.findByPk(req.query.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        await PurchaseOrderItems.destroy({ where: { purchaseId: order.id } });
        await order.destroy();

        res.json({ message: 'Order and items deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

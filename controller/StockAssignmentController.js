const StockAssignment = require('../models/stockassignments');
const Orders = require('../models/orders');
const RawMaterials = require('../models/rawmaterials');
const sequelize = require('../config/db');

exports.CreateStockAssignments = async (req, res) => {
    try {
        const stockAssignments = req.body;
        
        if (!stockAssignments || !Array.isArray(stockAssignments) || stockAssignments.length === 0) {
            return res.status(400).json({ 
                status: false, 
                message: "Stock assignments data is required and should be an array" 
            });
        }

        const orderId = stockAssignments[0].orderId;
        
        // Validate stock availability before creating assignments
        for (const assignment of stockAssignments) {
            const rawMaterial = await RawMaterials.findByPk(assignment.rawMaterialId);
            
            if (!rawMaterial) {
                return res.status(400).json({
                    status: false,
                    message: `Raw material with ID ${assignment.rawMaterialId} not found`
                });
            }
            
            if (rawMaterial.currentStock < assignment.quantityAssigned) {
                return res.status(400).json({
                    status: false,
                    message: `Insufficient stock for ${assignment.rawMaterial}. Available: ${rawMaterial.currentStock}, Requested: ${assignment.quantityAssigned}`
                });
            }
        }
        
        // Delete existing stock assignments for this orderId
        await StockAssignment.destroy({
            where: {
                orderId: orderId
            }
        });

        // Create stock assignments
        const createdAssignments = await StockAssignment.bulkCreate(
            stockAssignments.map(e => ({
                orderId: e.orderId,
                productId: e.productId, 
                rawMaterial: e.rawMaterial,
                rawMaterialId: e.rawMaterialId,
                quantityAssigned: e.quantityAssigned,
                assignedBy: e.assignedBy,
                assignedDate: e.assignedDate,
                notes: e.notes,
                status: "1"
            })),
            { returning: true }
        );

        if (createdAssignments.length < stockAssignments.length) {
            throw new Error("Failed to create some stock assignments");
        }
        await Promise.all(
            stockAssignments.map(async (assignment) => {
                await RawMaterials.update(
                    { 
                        currentStock: sequelize.literal(`currentStock - ${Number(assignment.quantityAssigned)}`)
                    },
                    { where: { id: assignment.rawMaterialId } }
                );
            })
        );

        // Update order status
        await Orders.update(
            { orderStatus: "2" },
            { where: { id: orderId } } 
        );

        res.status(200).json({ 
            status: true, 
            message: "Stock assignments created successfully",
        });

    } catch (ex) {
        console.error('Error in CreateStockAssignments:', ex);
        res.status(500).json({ 
            status: false, 
            message: ex.message || "An error occurred while creating stock assignments" 
        });
    }
};


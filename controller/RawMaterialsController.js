const {Vendor,Rawmaterial} = require('../models/rawmaterialsassociation');
const { Op } = require('sequelize');
const sequelize = require('../config/db');


exports.getAllRawMaterials = async (req, res) => {
    try {
        const {search , category} =  req.query;
        const whereClause = {
                    status: '1',
                };
        
                if (search && search.trim() !== '') {
                    whereClause.name = {
                        [Op.like]: `%${search.trim()}%`
                    };
                }

                if(category && category.trim()!==''){
                    whereClause.category={
                         [Op.like]: `%${category.trim()}%`
                    }
                }
        
        const rawmaterials = await Rawmaterial.findAll({
            where: whereClause,
            include: [{ model: Vendor, attributes: ['name', 'email', 'phone'] ,as: 'vendor', }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: rawmaterials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch raw materials', error: error.message });
    }
};

exports.getRawMaterialbyId = async (req, res) => {
    try {
        const {id} = req.query;
        const rawmaterials = await Rawmaterial.findOne({
            where: { status: "1",id:id },
            include: [{ model: Vendor, attributes: ['name', 'email', 'phone'] ,as: 'vendor', }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: rawmaterials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch raw materials', error: error.message });
    }
};


exports.getRawMaterialbyName = async (req, res) => {
    try {
        const {name} = req.query;
        const rawmaterials = await Rawmaterial.findOne({
            where: { status: "1",name:name },
            include: [{ model: Vendor, attributes: ['name', 'email', 'phone'] ,as: 'vendor', }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: rawmaterials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch raw materials', error: error.message });
    }
};


exports.getRawMaterialbyBarcode = async (req, res) => {
    try {
        const {barcode} = req.query;
        const rawmaterials = await Rawmaterial.findOne({
            where: { status: "1",barcode:barcode},
            include: [{ model: Vendor, attributes: ['name', 'email', 'phone'] ,as: 'vendor', }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: rawmaterials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch raw materials', error: error.message });
    }
};


exports.addRawMaterial = async (req, res) => {
    try {
        const {
            name,
            description,
            unit,
            category,
            currentStock,
            minimumStock,
            unitPrice,
            vendorId
        } = req.body;

        const newMaterial = await Rawmaterial.create({
            name,
            description,
            unit,
            category,
            currentStock,
            minimumStock,
            unitPrice,
            vendorId,
            status: "1"
        });

        await Rawmaterial.update({barcode:`SBICRM-100000${newMaterial.id.toString()}`},{where:{id:newMaterial.id}})

        res.status(200).json({ success: true, message: "Raw Materials Added" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add raw material', error: error.message });
    }
};

exports.updateRawMaterial = async (req, res) => {
    try {
        const { id } = req.query;

        const material = await Rawmaterial.findByPk(id);

        if (!material || material.status !== "1") {
            return res.status(200).json({ success: false, message: 'Raw material not found or inactive' });
        }

        await material.update(req.body);

        res.status(200).json({ success: true, message: 'Raw material updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Update failed', error: error.message });
    }
};


exports.deleteRawMaterial = async (req, res) => {
    try {
        const { id } = req.query;

        const material = await Rawmaterial.findByPk(id);

        if (!material || material.status !== "1") {
            return res.status(200).json({ success: false, message: 'Raw material not found or already inactive' });
        }

        await material.update({ status: "0" });

        res.status(200).json({ success: true, message: 'Raw material safely deleted (status set to 0)' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete failed', error: error.message });
    }
};

exports.getLowStockAlerts = async (req, res) => {
    try {
        const lowStockMaterials = await Rawmaterial.findAll({
            where: {
                status: '1',
                [Op.and]: [
                    sequelize.literal('CAST(currentStock AS DECIMAL) <= CAST(minimumStock AS DECIMAL)')
                ]
            },
            include: [{ model: Vendor, attributes: ['name', 'email', 'phone'], as: 'vendor' }],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: lowStockMaterials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch low stock alerts', error: error.message });
    }
};
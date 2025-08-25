const Vendor = require('../models/vendors');
const { Op } = require('sequelize');

exports.getAllVendors = async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = {
            status: '1',
        };

        if (search && search.trim() !== '') {
            whereClause.name = {
                [Op.like]: `%${search.trim()}%`
            };
        }

        const vendors = await Vendor.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: vendors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch vendors', error: error.message });
    }
};


exports.getVendorById = async (req, res) => {
    try {
        const { id } = req.query;
        const vendors = await Vendor.findOne({
            where: {id:id,status:"1"},
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ success: true, data: vendors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch vendors', error: error.message });
    }
};



exports.addVendor = async (req, res) => {
    try {
        const {
            name,
            contactPerson,
            email,
            phone,
            address,
            gstNumber,
            paymentTerms
        } = req.body;

        const newVendor = await Vendor.create({
            name,
            contactPerson,
            email,
            phone,
            address,
            gstNumber,
            paymentTerms,
            status: '1'
        });

        res.status(200).json({ success: true, message:"Vendors Added Successfully !" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add vendor', error: error.message });
    }
};


exports.updateVendor = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(200).json({ success: false, message: 'Vendor ID is required in query params' });
        }

        const vendor = await Vendor.findByPk(id);

        if (!vendor || vendor.status !== '1') {
            return res.status(200).json({ success: false, message: 'Vendor not found or inactive' });
        }

        await vendor.update(req.body);

        res.status(200).json({ success: true, message: 'Vendor updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update vendor', error: error.message });
    }
};


exports.deleteVendor = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(200).json({ success: false, message: 'Vendor ID is required in query params' });
        }

        const vendor = await Vendor.findByPk(id);

        if (!vendor || vendor.status !== '1') {
            return res.status(200).json({ success: false, message: 'Vendor not found or already inactive' });
        }

        await vendor.update({ status: '0' });

        res.status(200).json({ success: true, message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete vendor', error: error.message });
    }
};

const Leads  = require('../models/leads');
const Orders = require('../models/orders');
const Estimation = require('../models/estimation');

exports.getAllLeads = async (req, res) => {
  try {
    const data = await Leads.findAll({where:{status:"1"}, order: [['id', 'DESC']]});
    res.status(200).json({success:"true",data:data});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch records', details: error.message });
  }
};


exports.getLeadsById = async (req, res) => {
  const { id } = req.query;
  try {
    const record = await Leads.findByPk(id,{where:{status:"1"}});
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({success:"true",data:record});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch record', details: error.message });
  }
};

exports.addLeads = async (req, res) => {
  try {
    const { name, date, email, phoneNumber, module, source } = req.body;

    if (!name || !date || !email || !phoneNumber || !module || !source) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLead = await Leads.create({
      name,
      date,
      email,
      phoneNumber,
      module,
      source,
      isOrder:'0',
      status: '1', 
    });

    res.status(200).json({ success: true, message: 'Leads Created Successfully!', data: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(400).json({ error: 'Failed to create record', details: error.message });
  }
};

exports.editLeads = async (req, res) => {
  const { id, name, date, email, phoneNumber, module, source, isOrder, status } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Lead ID is required in body' });
  }

  try {
    const lead = await Leads.findByPk(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    await lead.update({
      name: name ?? lead.name,
      date: date ?? lead.date,
      email: email ?? lead.email,
      phoneNumber: phoneNumber ?? lead.phoneNumber,
      module: module ?? lead.module,
      source: source ?? lead.source,
      isOrder: isOrder ?? lead.isOrder,
      status: status ?? lead.status,
    });

    res.status(200).json({ success: true, message: 'Lead updated successfully', data: lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(400).json({ error: 'Failed to update lead', details: error.message });
  }
};

exports.convertLeads = async (req, res) => {
  const { id, date } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Lead ID is required in query' });
  }

  try {
    const lead = await Leads.findByPk(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const estimation = await Estimation.findOne({ where: { leadId: lead.id } });

    if (!estimation) {
      return res.status(404).json({ error: 'Estimation not found for this lead' });
    }

    await lead.update({
      isOrder: 1
    });

    await Orders.create({
      leadId: id,
      estId: estimation.id,
      date: "31-07-2025",
      orderStatus:"0",
      status: "1"
    });

    res.status(200).json({ success: true, message: 'Lead converted to Order successfully' });
  } catch (error) {
    console.error('Error converting lead:', error);
    res.status(400).json({ error: 'Failed to convert lead', details: error.message });
  }
};


exports.deleteLeads = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Id is not defined" });
  }

  try {
    const lead = await Leads.findByPk(id);

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    await lead.update({ status: "0" });

    return res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (ex) {
    return res.status(500).json({ success: false, message: "Failed to delete lead", error: ex.message });
  }
};







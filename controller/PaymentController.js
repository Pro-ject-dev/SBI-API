const Payment = require('../models/payment');

exports.addPayment = async (req, res) => {
  try {
    const paymentData=req.body;
    paymentData.status = "1";
    await Payment.create(req.body);
    res.status(200).json({ success: true, message: "Payment Added" });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, error: error });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch payments' });
  }
};


exports.getPaymentById = async (req, res) => {
  try {
    const id = req.query.orderId;

    const payments = await Payment.findAll({ where: { orderId: id } });

    if (payments.length === 0) {
      return res.status(200).json({ success: false, message: 'No payments found for this Order ID' });
    }
    const totalAmt = payments.reduce((sum, payment) => {
      const amt = parseFloat(payment.paidAmt) || 0;
      return sum + amt;
    }, 0);

    res.status(200).json({ success: true, totalPaidAmt: totalAmt, data: payments });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
};


exports.updatePayment = async (req, res) => {
  try {
    const id = req.query.id;
    const [updated] = await Payment.update(req.body, { where: { id } });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Payment not found or no changes made' });
    }
    res.status(200).json({ success: true, message:"Payment Updated" });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ success: false, error: 'Failed to update payment' });
  }
};


exports.deletePayment = async (req, res) => {
  try {
    const id = req.query.id;
    const deleted = await Payment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ success: false, error: 'Failed to delete payment' });
  }
};

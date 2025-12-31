const Inventory = require('../models/inventory.model');

exports.getAllInventory = async (req, res) => {
    try {const items = await Inventory.findAll();
        res.status(200).json({success: true, data: items});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error"});
    }
};

exports.getAlerts = async (req, res) => {
  try{
    const lowStock = await Inventory.findLowStock();
    res.status(200).json({success: true, count: lowStock.length, data: lowStock});
  } catch (error) {
    res.status(500).json({success: false, message: "Server error"});
  }
};
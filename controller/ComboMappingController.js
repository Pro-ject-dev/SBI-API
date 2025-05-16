const combomappingModel = require('../models/combomapping');
const productModel = require('../models/products');
const cateoryModel = require('../models/category');
const comboModel = require('../models/combo');

exports.addComboMapping= async(req,res)=>{
    try {
    const {date,productId,catId,comboId}=req.body;
    const insertData= await combomappingModel.create({date,productId,catId,comboId,status:1});
    console.log(insertData);
    res.status(201).json({status:true,message:"Combo Added Successfully"});
    } catch (error) {
        res.status(500).json({status:false, message:error});
    }
   
}

exports.deleteComboMapping = async(req,res)=>{
    try {
        const {id}= req.body;
        await combomappingModel.update({status:0},{where:{id:id}});
        res.status(200).json({status:true,message:"Combo Deleted Successfully"});
    } catch (error) {
        res.status(500).json({status:false,message:error});
    }
}


exports.getComboMapping = async(req,res)=>{
      try {
       const comboMappings = await combomappingModel.findAll({
      where: { status: 1 },
      include: [
        {
          model: productModel,
          attributes: ['id', 'productName'] 
        },
        {
          model: cateoryModel,
          attributes: ['id', 'name']
        },
        {
          model: comboModel,
          attributes: ['id', 'name']
        }
      ]
    });
    res.status(200).json({status:200,data:comboMappings})
    } catch (error) {
       res.status(500).json({status:false,message:error}); 
    }
}


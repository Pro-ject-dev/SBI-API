const combomappingModel = require('../models/combomapping');

exports.addComboMapping= async(req,res)=>{
    try {
    const {date,productid,catid,comboid}=req.body;
    const insertData= await combomappingModel.create({date,productid,catid,comboid,status:1});
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


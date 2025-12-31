const Consumer = require('../models/consumer.model');
exports.getProfile = async (req, res) => {
    try{
        const consumerId = await
        Consumer.findById(req.params.id);
        if(!consumerId){
            return res.status(404).json({message: "Consumer not found"});
        }
        res.status(200).json(consumer);
    }catch(error){
        res.status(500).json({message: "Server error"});
    }
};
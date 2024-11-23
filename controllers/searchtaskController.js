const Task = require('../models/task'); 

module.exports = async (req, res) => {
    try {
        const { word } = req.params; //คำที่ค้นหา /searchtask/word
        const regex = new RegExp(word, 'i'); // Regular Expression ค้นหาแบบ Case-insensitive
        const tasks = await Task.find({
            $or: [
                { TaskName: regex }, // ค้นหาใน TaskName
                { Detail: regex } // หรือค้นหาใน Detail
            ]
        }); 
       
        

        res.status(200).json(tasks); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
const Task = require('../models/task'); 

module.exports = async (req, res) => {
    try {
        const tasks = await Task.find(); // ดึงข้อมูลทั้งหมด
        res.status(200).json(tasks); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};
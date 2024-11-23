const Task = require('../models/task'); 
const mongoose = require('mongoose');

module.exports = async (req, res) => {
    try {
        const taskId = req.params.id;  // /updatetask/id
        const { taskName, detail, dueDate, priority, status } = req.body;  

        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            console.log('Invalid ID format');
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        // ค้นหา task ด้วย taskId และทำการอัปเดต
        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            TaskName: taskName,
            Detail: detail,
            Duedate: dueDate,
            Priority: priority,
            Status: status
        }, { new: true });  // ใช้เพื่อให้ได้ข้อมูลที่อัปเดตแล้ว ที่แสดงใน  res.status(200).json(updatedTask);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });  // ถ้าไม่พบ task
        }
        if (!taskName || !detail || !dueDate || !priority || !status) {
            return res.status(400).json({ error: 'Invalid input: All fields are required' });
        }

        res.status(200).json(updatedTask);  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};
const Task = require("../models/task");
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    const taskId = req.params.id; // /gettask/id

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        // console.log('Invalid ID format');
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to fetch task" }); 
  }
};

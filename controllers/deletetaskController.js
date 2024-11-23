const Task = require("../models/task"); 
const mongoose = require('mongoose');

const deletetaskController = async (req, res) => {
  try {
    const { id } = req.params; // /delete/id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // console.log("Invalid ID format");
      return res.status(400).json({ message: "Invalid ID format" });
    }//เช็คว่าเป็นรูปแบบidไหม กันดับ ถ้าอยู่ๆไป /delete/idมั่วๆ

    // console.log(`ID received: ${id}`);
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      //ไม่เจอtask
      // console.log("Task not found");
      return res.status(404).json({ message: "Task not found" });
    }
    // console.log('Task deleted:', deletedTask);
    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    // console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error "});
  }
};
module.exports = deletetaskController;

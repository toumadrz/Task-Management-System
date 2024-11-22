const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  TaskName: { type: String, required: [true,'Please provide Task name'] },
  Detail: { type: String, required: [true,'Please provide Detail']},
  Duedate: { type: Date, required: true },
  DateCreate: { type: Number, default: () => Date.now() },
  Status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed']
  }, 
  Priority: { type: String, required: [true,'Please choose Piority'] },
});


const User = mongoose.model('Task', userSchema);

module.exports = User;
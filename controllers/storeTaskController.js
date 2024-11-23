const User = require('../models/task');

module.exports = async (req, res) => {
    try {
        const { task, detail, date, priority } = req.body;
        
        const dueDateTimestamp = new Date(date).getTime(); //แปลง time
        if (isNaN(dueDateTimestamp)) {
            return res.status(400).json({ error: 'Invalid due date format' });
        }

        // บันทึกข้อมูล
        await User.create({
            TaskName: task,
            Detail: detail,
            Duedate: dueDateTimestamp,
            Priority: priority,
            Status: "Pending"
        });

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const express = require('express');
const path = require('path');

const mongoose = require('mongoose')

const app = express();

const createTaskController = require('./controllers/createtaskController')
const storeTaskController = require('./controllers/storeTaskController')
const tasklistController = require('./controllers/tasklistController')
const getalltaskController = require('./controllers/getalltaskController')
const deletetaskController = require('./controllers/deletetaskController');
const searchtaskController = require('./controllers/searchtaskController');
const updatetaskController = require('./controllers/updatetaskController');
const gettaskController = require('./controllers/gettaskController');


mongoose.connect('mongodb+srv://admin:1234@cluster0.gx66z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser:true
    
})

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.delete('/delete/:id', deletetaskController);
app.get('/searchtask/:word', searchtaskController);
app.get('/gettask/:id', gettaskController);
app.put('/updatetask/:id', updatetaskController);


app.get('/', tasklistController);
app.get('/createtask', createTaskController);
app.get('/tasklist', tasklistController);
app.post('/task', storeTaskController);
app.get('/getalltask', getalltaskController);




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
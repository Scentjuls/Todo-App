var express = require('express');
var todoController = require('./controllers/todoController'); 
const mongoose = require('mongoose');

var app= express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static ('./public'));


//fire the controllers
todoController(app);

//listen to the port
app.listen(3001, () => console.log('you are listening to the port 3001') );

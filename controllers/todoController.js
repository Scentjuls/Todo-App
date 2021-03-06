var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://test:test@ds261118.mlab.com:61118/node-playlist');
console.log("you are connected");
//create a schema 
var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo', todoSchema);


// var data = [{item: "cook spag"}, {item:"make the bed"}, {item:"kick some ass"},{item:"learn React"}];

var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function (app){

app.get ('/todo', function (req, res){
    //get data from mongodb and pass to the view
    Todo.find({}, function (err, data){
        if (err) throw err; 
        res.render('todo', {todos: data});

    });
});

app.post ('/todo', urlencodedParser, function (req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
  
});

app.delete ('/todo/:item', function (req, res){
    //deleting the requested item from mongo db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
        if (err) throw err;
        res.json(data);
    }); 
});
}

var express = require('express');
var search = require('./search');

var app = express.createServer();

//config
app.set('view engine','ejs');
console.log('view dir' + __dirname+'/views');
app.set('views',__dirname + '/views');
app.set('view options',{layout:false});

console.log(app.set('views'));

app.get('/',function(req,res){
	res.render('index');
});

app.get('/search',function(req,res,next){
	search(req.query.q,function(err,results,resultCount){
		if (err){
			return next(err);
		}
		
		res.render('search',{search:req.query.q,
							results:results, 
							resultCount: resultCount});
	});
});

//listen
app.listen(8000);

var express = require('express');
var app = express();


app.set('view engine', 'html');

app.use('/', express.static(__dirname+'/src'));

app.set('views', __dirname+'/src/views');

app.get('/:name', function (req, res) {
    var name = req.params.name;
    res.render(__dirname+'/src/'+name);
  })
  
  app.listen(8888, function () {
    console.log('listening on port 8888!')
  })
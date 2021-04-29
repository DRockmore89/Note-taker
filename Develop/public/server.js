const express = require('express');
const apiRoutes = require(`${__dirname}/assets/js/apiRoutes.js`);
const htmlRoutes = require(`${__dirname}/assets/js/htmlRoutes.js`);
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001

app.use(express.static('./public'))

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

app.listen(port, () => console.log(`Express HTTP server is listening on port: ${port}`));

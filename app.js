const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();
const googleSheet = require('./googleSheets');

//authorize the google docs
googleSheet.setAuth();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
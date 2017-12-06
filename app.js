const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const app = express();
const googleSheet = require('./googleSheets');

const port = process.env.PORT || 3000;

//authorize the google docs
googleSheet.setAuth();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(port, () => console.log('Snack Api is Up and Running'));
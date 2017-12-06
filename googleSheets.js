const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
const creds = require('./secret.json');

// spreadsheet key is the long id in the sheets URL 
const doc = new GoogleSpreadsheet('1i0V39YqQGsw8977NHII2d4gr1flz650F6_bXU-1dq28');
let sheet;

module.exports = {

  setAuth: function setAuth() {
    // see notes below for authentication instructions! 
    var creds = require('./secret.json');
    // OR, if you cannot save the file locally (like on heroku) 
    // var creds_json = {
    //   client_email: 'heidelsoft.iphone@google.com',
    //   private_key: 'AIzaSyDeJNaIbYFROU3cW8GUr3ZSpcYY1otSyi0'
    // }

    doc.useServiceAccountAuth(creds, () => {
      console.log('doc authorized');
    });
  },

  //Users
  getUsers: (cb) => {
    doc.getRows(1, {
      offset: 1,
    }, (err, cells) => {
      let users = [];
      cells.forEach(user => {
        users.push({ name: user.name, firstName: user.first_name, lastName: user.last_name });
      });
      return cb(users);
    });
  },
  validateUser: (cb, userName, pwd) => {
    doc.getRows(1, {
      query: 'name===' + userName
    }, (err, rows) => {
      let user;
      if (rows) {
        user = { name: user.name, firstName: user.firstName, lastName: user.lastName };
      }
      cb(user);
    });
  },
  addUser: (cb, user) => {
    doc.addRow(1, user, (err, res) => {
      if (err) {
        cb(err);
      }
      cb(res);
    });
  },
  deleteUser: (cb, name) => {
    doc.getRows(1, {
      query: 'name==' + name
    }, (err, row) => {
      if (row.length > 0) {
        row[0].del(() => {
          cb('User removed success');
        })
      }
    });
  },

  //Items
  getItems: (cb) => {
    doc.getRows(2, {
      offset: 1
    }, (err, cells) => {
      let items = [];
      cells.forEach(item => {
        items.push({ name: item.name, url: item.url, description: item.description });
      });
      cb(items);
    });
  },
  addItem: (cb, item) => {
    doc.addRow(2, item, (err, res) => {
      if (err) {
        cb(err);
      }
      cb(res);
    });
  },

  //Orders
  getOrders: (cb) => {
    doc.getRows(3, {
      offset: 1,
      query: 'date=='+ new Date()
    }, (err, res) => {

    });
  },
  addOrder: (cb, order) => {
    doc.addRow()
  }
};
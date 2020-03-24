const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let AccountModel = require('../models/account');

let login = function(req, res) {
  AccountModel.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = uuid();
        user.tokenkey = token;
        user.save().then(function () {
          res.send({
            tokenkey: token,
            username: user.username,
            password: user.password,
            timeCreated: user.timeCreated,
            lastLogin: user.lastLogin,
            permission: user.permission,
            listDevices: user.listDevices,
            listAreas: user.listAreas,
          })
        })
          .catch(function (err) {
            res.send({ message: "Đã có lỗi xảy ra trong quá trình đăng nhập" })
          })
      } else {
        res.send({ message: "Sai tài khoản hoặc mật khẩu" })
      }
    } else {
      res.send({ message: "Sai tài khoản hoặc mật khẩu" })
    }
  })
}

let register = function(req, res) {
  AccountModel.findOne({ tokenkey: req.body.tokenkey, permission: 'admin' }, function (err, user) {
    if (user) {
      let newUser = new AccountModel({ username: req.body.username, password: bcrypt.hashSync(req.body.password, saltRounds)})
      let token = uuid();
      newUser.tokenkey = token;
      if (req.body.permission) {
        newUser.permission = req.body.permission;
      }
      newUser.save().then(user => {
        res.send({ username: user.username, tokenkey: user.tokenkey })
      })
    } else {
      res.send({ message: "Bạn không có quyền truy cập chức năng này" })
    }
  })
}

module.exports = {
  login: login,
  register: register
}

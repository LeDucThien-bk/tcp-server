var router = require('express').Router();
var auth = require('./src/controllers/authentication');



router.route('/LoginAPI/UsersLogin')
    .post(auth.login)


    
// router.route('/record/configreport')
//     .post(record.configReport)


module.exports = router;
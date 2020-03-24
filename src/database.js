let mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(process.env.DATABASE)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()
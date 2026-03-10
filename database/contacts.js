const MongoClient = require('mongodb').MongoClient;
const dbUri = process.env.MONGODB_URI;


let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(dbUri)
    .then((client) => {
        _db = client;
        callback(null, _db);
    })
    .catch((err) => {
        callback(err);
    });
}


const getDatabase = () => {
    if (!_db) {
        throw Error('Db not initialized.');
    }
    console.log(_db);
    
    return _db;
}

module.exports = {
    initDb,
    getDatabase,
};

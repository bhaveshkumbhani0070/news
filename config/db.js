var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoUrl = process.env.MONGODB_URI;
if (!mongoUrl) {
    console.log('PLease export mongoUrl');
    console.log('Use following commmand');
    console.log('*********');
    console.log('export MONGODB_URI=YOUR_MONGO_URL');

}
exports.connect = function(callback) {
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) {
            console.log('err', err);
            callback(false);
        } else {
            callback(db);
            // db.close();
        }
    });
};
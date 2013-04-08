var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('pagedb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to page database");
        db.collection('pages', {strict:true}, function(err, collection) {
            if(err) {
                console.log("The pages collection doesn't exist.  Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('pages', function(err, collection) {
        collection.find().toAray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving page: ' + id);
    db.collection('pages', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjecID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

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

exports.addPage = function(req, res) {
    var page = req.body;
    console.log('Adding page: ' + JSON.stringify(page));
    db.collection('pages', function(err, collection) {
        collection.insert(page, {safe:true}, function(err, collection) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
        });
    });
}

exports.updatePage = function(req, res) {
    var id = req.params.id;
    var page = req.body;
    console.log('Updating  page: ' + id);
    console.log(JSON.stringify(page));
    db.collection('pages', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, page, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(page);
            }
        });
    });
}

exports.deletePage = function(req, res) {
    var id = req.params.id;
    console.log('Deleting page: ' + id);
    db.collection('pages', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {
    var pages = [
    {
    },
    {
    }];

    db.collection('pages', function(err, collection) {
        collection.insert(pages, {safe:true}, function(err, result) {});
    });
};

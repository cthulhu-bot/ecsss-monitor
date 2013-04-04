exports.findAll = function(req, res) {
    res.send([{name:'studentPage'}, {name:'schoolPage'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "Page Name", description: "description"});
};

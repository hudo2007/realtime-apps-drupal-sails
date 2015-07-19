/**
 * NodeController
 * 
 * @description :: Server-side logic for managing Nodes
 * @help :: See http://links.sailsjs.org/docs/controllers
 */

var rp = require('request-promise');
var Promise = require('bluebird');

function getCsrf() {
  var connection = sails.config.connections.rest;
  
  return rp(connection.protocol + '://' + connection.host + '/rest/session/token');
}

function find(req, res) {
  Node.find()
  .then(function(results) {
    Node.subscribe(req.socket, results);
    Node.watch(req.socket);
    
    res.json(results);
  })
  .catch(function(err) {
    console.log(err);
    res.badRequest();
  });
}

function findOne(req, res) {
  Node.findOne({
    id : req.params.id
  })
  .then(function(result) {
    Node.subscribe(req.socket, result);
    res.json(result);
  })
  .catch(function(err) {
    console.log(err);
    res.badRequest();
  });
  
}

function create(req, res) {
  getCsrf()
  .then(function(csrf) {
    var updates = req.body;

    var vals = _.pick(updates, ['title', 'status', 'type']);

    vals.type = [ { value : vals.type[0].target_id } ];
    
    vals.csrf = csrf;
    
    return Node.create(vals);
  })
  .then(function(result) {
    return Node.findOne(result);
  })
  .then(function(result) {
    result.temp_id = req.body.temp_id || null;
    
    Node.publishCreate(result, req);
    res.json(result);
  })
  .catch(function(err) {
    console.log(err);
    res.badRequest();
  });
}

function update(req, res) {
  getCsrf()
  .then(function(csrf) {
    var updates = req.body;
    var vals = _.pick(updates, ['title', 'status', 'type']);

    vals.type = [ { value : vals.type[0].target_id } ];
    
    vals.csrf = csrf;
    
    return Node.update({ id : req.params.id }, vals);
  })
  .then(function(result) {
    return Node.findOne({
      id : req.params.id
    });
  })
  .then(function(result) {
    Node.publishUpdate(req.params.id, result, req);
    res.send(204, null);
  })
  .catch(function(err) {
    console.log(err);
    res.badRequest();
  });
}

function destroy(req, res) {
  Node.destroy({
    id : req.params.id
  })
  .then(function(result) {
    Node.publishDestroy(req.params.id);
    res.send(204, null);
  })
  .catch(function(err) {
    console.log(err);
    res.badRequest();
  });
}

module.exports = {
  find : find,
  findOne : findOne,
  create : create,
  update : update,
  destroy : destroy
};


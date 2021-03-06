'use strict';

var _ = require('lodash');

/**
 * Policy to set necessary update data to body. Note that this policy will also remove some body items.
 *
 * @param   {Request}   request     Request object
 * @param   {Response}  response    Response object
 * @param   {Function}  next        Callback function
 */
module.exports = function dynamicNode(request, response, next) {
  sails.log.verbose(__filename + ':' + __line + ' [Policy.dynamicNode() called]');

  sails.models.kongnode.findOne({
    active:true
  }).exec(function afterwards(err, node){
    if (err) return next(err)
    if(!node) {
      var error = new Error();
      error.message = 'Unable to find a node to connect'
      error.code = 'E_NODE_UNDEFINED'
      error.status = 500;
      return  next(error)
    }
    request.node_id = node.id
    sails.config.kong_admin_url = 'http://' + node.kong_admin_ip + ':' + node.kong_admin_port
    return  next()
  })

};

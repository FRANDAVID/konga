'use strict';

/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 *
 * @param   {{}}  data    Data for response
 * @param   {{}}  options Response options
 * @returns {*}
 */
module.exports = function kongError(data, options) {
  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  /**
   * If second argument is a string, we take that to mean it refers to a view.
   * If it was omitted, use an empty object (`{}`)
   */
  options = (typeof options === 'string') ? {view: options} : options || {};

  // Log error to console
  //if (data !== undefined) {
  //  sails.log.error('Sending 500 ("Server Error") response: \n', data);
  //} else {
  //  sails.log.error('Sending empty 500 ("Server Error") response');
  //}

  // Backend will always response JSON
  if(data.error && data.error.code && data.error.code === 'ETIMEDOUT') {
    return res.json(500, {message: 'Request timed out'});
  }



  return res.json(data.statusCode, {customMessage:data.body});
};

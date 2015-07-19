var _ = require('lodash');

/**
 * Extracts query parameters and returns allowed parameters with defaults, if
 * provided. 'All' is considered equivalent to not existing.
 * 
 * @param Request
 *         req The request
 * @param Array
 *         params Allowed parameters
 * @param Object
 *         default Default values for parameters
 * 
 * @return Object A hash containing allowed values from the request or the
 *         default if they did not exist
 */
function getQueryParams(req, params, defaults) {
  var vals = _.extend(defaults, _.pick(req.query, params));
  return _.transform(vals, function(result, n, key) {
    if (n !== 'All') {
      result[key] = n;
    }
  });
}

/**
 * Converts a hash of parameters into a URL encoded string
 * 
 * @param Object
 *         obj The hash to convert
 * @return String URL encoded string
 */
function serialize(obj) {
  return '?' + Object.keys(obj).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
  }).join('&');
}

module.exports = {
  getQueryParams : getQueryParams,
  serialize : serialize
}
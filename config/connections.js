/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

var _ = require('lodash');
var url = require('url');

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_POSTGRES_USER',
    password: 'YOUR_POSTGRES_PASSWORD',
    database: 'YOUR_POSTGRES_DB'
  },


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

  rest: {
    adapter: 'sails-rest',
    host:     'localhost:8081',  // api host
    protocol: 'http',            // api HTTP protocol
    pathname: '',                 // api endpoint path name
    headers:  {},                // Optional HTTP headers  
    methods: {
      update : 'patch'
    },
    hooks: {
      merge:    false,            // flag that indicates whether or not to merge build-in hooks with user-provided hooks
      before:   [ function(req, method, config, conn) {
        var query = {};
        if (_.isObject(conn.options) && conn.options.hasOwnProperty('where')) {
          query = conn.options.where;
          delete conn.options.where;
          conn.options = _.merge(conn.options, query);
        }
      },
      function(req, method, config, conn) {
        if (_.isObject(conn.options) && conn.options.hasOwnProperty('id')) {
          config.endpoint = url.resolve(conn.connection.endpoint + '/', conn.collection + '/' + conn.options.id);
          delete conn.options.id;
        } else {
          if ('post' == method) {
            config.endpoint = url.resolve(conn.connection.endpoint + '/', 'entity/' + conn.collection);
          }
          else {
            config.endpoint = url.resolve(conn.connection.endpoint + '/', 'api/todo');
          }
        }
      }, 
      function(req, method, config, conn) {
        // Set the format option
        if ('get' == method) {
          conn.options._format = 'json';
        }

        // Set CSRF token
        if (_.has(conn.values, 'csrf')) {
          conn.connection.headers = conn.connection.headers || {};
          conn.connection.headers['X-CSRF-Token'] = conn.values.csrf;
          delete conn.values.csrf;
        }

        // Remove updatedAt attribute
        if (_.has(conn.values, 'updatedAt')) {
          delete conn.values.updatedAt;
        }
        
        // Remove createdAt attribute
        if (_.has(conn.values, 'createdAt')) {
          delete conn.values.createdAt;
        }
      }], 
      after:    [ function(err, res) {
        // If the request was successful and we received the CREATED response
        if (!err && 201 == res.statusCode && _.has(res.headers, 'location')) {
          var parts = res.headers.location.split('/');
          res.body.id = parts.pop();
        } 
        
        if (_.isArray(res.body)) {
          res.body = _.map(res.body, function(result) {
            result.id = result.nid[0].value;
            
            return result;
          }); 
        }
        else if (_.has(res.body, 'nid')) {
          res.body.id = res.body.nid[0].value;
        }
      }]
    }
  }
};

# Realtime Apps with Drupal and SailsJS

This project contains code for SailsJS and Drupal 8. The Drupal site is in /public where Sails is in /api, /assets, /views, etc. See http://sailsjs.org/ for more information. The Configuration Management export is at /config/config.tar.gz.

## Starting the project

1. Clone repository
2. Install Drupal 8
3. Install Configuration Management package
4. Change ```/config/connections.js``` line 97 to correct URL for Drupal
5. Run ```npm install``` to install Node packages
6. Run ```bundle install``` to install Ruby gems
7. Run ```sails lift``` to run Grunt build and launch Sails
8. View site at http://localhost:1337

## Software required

1. Grunt -- http://gruntjs.com/
2. Bundler -- http://bundler.io/
3. Bower -- http://bower.io/
4. NodeJS, v 0.10+
5. Drupal 8 requirements

## Structure
* /api -- SailsJS server code
* /assets -- Client (AngularJS) code
* /config -- SailsJS server config
* /tasks -- Grunt task configuration
* /views -- Server views

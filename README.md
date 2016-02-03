[![Build Status](https://travis-ci.org/atsid/gcal-leave-scraper.svg?branch=master)](https://travis-ci.org/atsid/gcal-leave-scraper)
[![Code Climate](https://codeclimate.com/github/atsid/gcal-leave-scraper/badges/gpa.svg)](https://codeclimate.com/github/atsid/gcal-leave-scraper)
[![Test Coverage](https://codeclimate.com/github/atsid/gcal-leave-scraper/badges/coverage.svg)](https://codeclimate.com/github/atsid/gcal-leave-scraper/coverage)
[![Dependency Status](https://david-dm.org/atsid/gcal-leave-scraper.svg)](https://david-dm.org/atsid/gcal-leave-scraper)
[![devDependency Status](https://david-dm.org/atsid/gcal-leave-scraper/dev-status.svg)](https://david-dm.org/atsid/gcal-leave-scraper#info=devDependencies)

# gcal-leave-scraper
Server application that scans google calendars for leave events matching specific criteria and logs details on them.

# Requirements
* Node version 4.*
* Local MongoDB
* Gulp

# How to launch
* Start your MongoDB instance. "docker run --name gcal-leave-scraper -p 27017:27017 mongo --smallfiles"  <br /><b>or</b><br />mongod --port 27017 --dbpath &lt;mongoHome&gt;\data\db
* "gulp develop" from the project root
* Go to localhost:9000 in your web browser

# Quickstarts
* Use the quickstarts/quickstart-mine.sh script to create a user and put the user in Mongo along with any matching events.

# To create a service account with Google
* Go to https://console.developers.google.com and setup a new application
* From the application "Overview" screen, enable the Google Calendar API, Google+ API, and admin SDK
* From the "Credentials" screen click "Add credential" -> "OAuth 2.0"
* Set the credential application type to "other" -> "installed"
* Download the credential file and put it in the local project root as "client_secret.json"

# Configuration
* Copy ./config/local.coffee.template to ./config/local.coffee
* Replace clientID, clientSecret, and domain from the google credentials section above

# Misc Thoughts
* Service API is mounted at http://localhost:9000/api
* Must connect to the standard UI at http://localhost:9000/ before using a web service in order to authenticate
* List all events: GET http://localhost:9000/api/events/listAllEvents

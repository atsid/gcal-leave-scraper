[![Build Status](https://travis-ci.org/atsid/gcal-leave-scraper.svg?branch=master)](https://travis-ci.org/atsid/gcal-leave-scraper)
[![Code Climate](https://codeclimate.com/github/atsid/gcal-leave-scraper/badges/gpa.svg)](https://codeclimate.com/github/atsid/gcal-leave-scraper)
[![Test Coverage](https://codeclimate.com/github/atsid/gcal-leave-scraper/badges/coverage.svg)](https://codeclimate.com/github/atsid/gcal-leave-scraper/coverage)
[![Dependency Status](https://david-dm.org/atsid/gcal-leave-scraper.svg)](https://david-dm.org/atsid/gcal-leave-scraper)
[![devDependency Status](https://david-dm.org/atsid/gcal-leave-scraper/dev-status.svg)](https://david-dm.org/atsid/gcal-leave-scraper#info=devDependencies)

# gcal-leave-scraper
Server application that scans google calendars for leave events matching specific criteria and logs details on them.

# Requirements
* Local MongoDB
* Gulp

# How to launch
* Start your MongoDB instance. "docker run --name gcal-leave-scraper -p 27017:27017 mongo --smallfiles"
* "gulp develop" from the project root
* Go to localhost:9000 in your web browser


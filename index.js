"use strict";
var config = require("config");
var debug = require("debug")("app:bootstrap");
require("babel/register");
require("./server/main");

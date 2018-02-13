const functions = require('./functions.js');
const schedule = require('node-schedule');
const delay = require('delay');

var job = schedule.scheduleJob('*/15 13-22 * * *',functions.retweet);

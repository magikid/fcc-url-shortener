'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoredUrl = new Schema({
    originalUrl: String,
    shortUrl: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('StoredUrl', StoredUrl);
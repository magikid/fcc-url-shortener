'use strict';

var StoredUrls = require('../models/storedUrls.js');
var crypto = require('crypto');
var validUrl = require('valid-url');

function UrlHandler(mongoose){

    this.encodeUrl = function (req, res){
        var originalUrl = req.params[0];
        var token = crypto.randomBytes(64).toString('hex').slice(0, 6);

        if (!validUrl.isUri(originalUrl)){
            res.json({error: "An invalid URL was passed"});
            return;
        }

        StoredUrls.find({originalUrl: originalUrl},{"_id": 0})
            .limit(1)
            .select("originalUrl shortUrl")
            .exec(function(err, foundRecord){
                if(foundRecord.length > 0){
                    res.json(foundRecord[0])
                }else{
                    var newUrl = new StoredUrls({originalUrl: originalUrl, shortUrl: token});
                    newUrl.save(function(err, storedUrl){
                        if(err){ throw err; }
                        res.json({originalUrl: storedUrl.originalUrl, shortUrl: storedUrl.shortUrl});
                    })
                }
            });
    }

    this.decodeUrl = function (req, res){
        var urlId = req.params["urlId"];
        StoredUrls.find({shortUrl: urlId}, {"_id": 0})
            .limit(1)
            .select("originalUrl shortUrl")
            .exec(function(err, foundRecord){
                if(foundRecord.length > 0){
                    res.json(foundRecord[0])
                }else{
                    res.json({error: "No URL found"});
                }
            })
    }
}

module.exports = UrlHandler;
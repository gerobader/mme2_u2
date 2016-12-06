/** This module defines the routes for videos using the store.js as db memory
 *
 * @author Johannes Konert
 * @licence CC BY-SA 4.0
 *
 * @module routes/videos
 * @type {Router}
 */

// remember: in modules you have 3 variables given by CommonJS
// 1.) require() function
// 2.) module.exports
// 3.) exports (which is module.exports)

// modules
var express = require('express');
var logger = require('debug')('me2u4:videos');
var store = require('../blackbox/store');

var videos = express.Router();

// if you like, you can use this for task 1.b:
var requiredKeys = {title: 'string', src: 'string', length: 'number'};
var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************


videos.route('/')
    .get(function(req,res,next) {
        var videos = store.select('videos');
        if(videos == undefined){
            res.status(204).end();
        } else {
            res.status(200).locals.items = store.select('videos');
        }

    })

    .put(function (req,res,next) {
        var err = new Error('This action is not allowed on this URL!');
        err.status = 405;
        next(err);
    })

    .post(function(req, res, next) {
        var err = undefined;
        if(req.body.title == undefined || req.body.src == undefined || req.body.length == undefined){
            err = new Error('Required Parameters are missing (title, src, length)!');
            err.status = 400;
            next(err);
        }
        if(req.body.description == undefined){
            req.body.description = "";
        }
        if(req.body.playcount == undefined){
            req.body.playcount = 0;
        }
        if(req.body.ranking == undefined){
            req.body.ranking = 0;
        }
        if(req.body.playcount < 0 || req.body.ranking < 0 || req.body.length < 0){
            err = new Error('At least one optional Parameter has an illegal value!');
            err.status = 400;
            next(err);
        }
        req.body.timestamp = Date.now();
        var id = store.insert('videos', req.body);
        res.status(201).json(store.select('videos', id));
    });


videos.route('/:id')
    .get(function(req, res, next) {
        var videos = store.select('videos', req.params.id);
        var err = undefined;
        if(videos == undefined){
            err = new Error('There is no Video under this id')
            err.status = 404;
            next(err);
        }
        res.status(200).json(videos);
    })

    .put(function(req,res,next) {
        var err = undefined;
        if(req.params.id == req.body.id){
            if(req.body.title == undefined || req.body.src == undefined || req.body.length == undefined){
                err = new Error('Required Parameters are missing (title, src, length)!');
                err.status = 400;
                next(err);
            }
            if(req.body.description == undefined){
                req.body.description = "";
            }
            if(req.body.playcount == undefined){
                req.body.playcount = 0;
            }
            if(req.body.ranking == undefined){
                req.body.ranking = 0;
            }
            
            if(req.body.playcount < 0 || req.body.ranking < 0 || req.body.length < 0){
                err = new Error('At least one optional Parameter has an illegal value (playcount, raking, length)!');
                err.status = 400;
                next(err);
            }

            store.replace('videos',req.params.id, req.body);
            res.status(200).json(store.select('videos', req.body.id));
        } else {
            err = new Error('The URL-ID doesn\'t match the ID given in the Body!');
            err.status = 400;
            next(err);
        }
    })

    .delete(function(req, res, next) {
        var video = store.select('videos', req.params.id);
        var err = undefined;
        if(video == undefined){
            err = new Error('There is no Video with the ID:' + req.params.id);
            err.status = 404;
            next(err);
        }else{
            store.remove('videos', req.params.id);
            res.setHeader('Content-Type', 'application/json');
            res.status(204).end();
        }
    })

    .post(function(req, res, next){
        var err = new Error('This action is not allowed on this URL!');
        err.status = 405;
        next(err);
    });




// this middleware function can be used, if you like (or remove it)
videos.use(function(req, res, next){
    // if anything to send has been added to res.locals.items
    if (res.locals.items) {
        // then we send it as json and remove it
        res.json(res.locals.items);
        delete res.locals.items;
    } else {
        // otherwise we set status to no-content
        res.set('Content-Type', 'application/json');
        res.status(204).end(); // no content;
    }
});

module.exports = videos;

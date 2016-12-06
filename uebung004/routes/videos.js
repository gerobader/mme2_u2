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
        res.status(405).json(
            {
                "error": {
                    "message": "This action is not allowed on this URL!",
                    "code" : 405
                }
            }
        );

    })

    .post(function(req, res, next) {
        var err = undefined;
        if(req.params.id == req.body.id){
            if(req.body.title == undefined || req.body.src == undefined || req.body.length == undefined || req.body.length < 0){
                err = new Error('required parameters are missing dude');
                res.status(400).json(
                    {
                        "error": {
                            "message": "at least one required parameter not set, required parameters are: title, source, length",
                            "code" : 400
                        }
                    }
                );
            }
            if(req.body.description == undefined){
                req.body.description = "";
            }
            if(req.body.playcount == undefined || req.body.playcount < 0){
                req.body.playcount = 0;
            }
            if(req.body.ranking == undefined || req.body.ranking < 0){
                req.body.ranking = 0;
            }

            var id = store.insert('videos',req.body);
            res.status(201).json(store.select('videos', id));
        } else {
            err = new Error('can not insert dude');
            err.status = 400;
        }


    });


videos.route('/:id')
    .get(function(req, res, next) {
        res.json(store.select('videos',req.params.id));
    })


    .put(function(req,res,next) {
        var err = undefined;
        if(req.params.id == req.body.id){
            if(req.body.title == undefined || req.body.src == undefined || req.body.length == undefined || req.body.length < 0){
                err = new Error('required parameters are missing dude');
                res.status(400).json(
                    {
                        "error": {
                            "message": "at least one required parameter not set, required parameters are: title, source, length",
                            "code" : 400
                            }
                    }
                );
            }
            if(req.body.description == undefined){
                req.body.description = "";
            }
            if(req.body.playcount == undefined || req.body.playcount < 0){
                req.body.playcount = 0;
            }
            if(req.body.ranking == undefined || req.body.ranking < 0){
                req.body.ranking = 0;
            }

            store.replace('videos',req.params.id, req.body);
            res.status(200).json(store.select('videos', req.body.id));
        } else {
            res.status(400).json(
                {
                    "error": {
                        "message": "can not replace dude",
                        "code" : 400
                    }
                }
            );
        }
    })

    .delete(function(req, res, next) {
        var videos = store.select('videos');
        for(var i = 0; i < videos.length; i++){
            if(req.params.id == videos[i].id){
                store.remove('videos', req.params.id);
                res.setHeader('Content-Type', 'application/json');
                res.status(204).end();
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.status(404).end();
            }
        }
    })

    .post(function(req, res, next){
        res.status(405).end()
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

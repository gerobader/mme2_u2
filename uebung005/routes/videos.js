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
var mongoose = require('mongoose');
var VideoModel = require('../models/videos');
var filter = require('../filter/filter.js');
var videos = express.Router();

// if you like, you can use this for task 1.b:
//var requiredKeys = {title: 'string', src: 'string', length: 'number'};
//var optionalKeys = {description: 'string', playcount: 'number', ranking: 'number'};
//var internalKeys = {id: 'number', timestamp: 'number'};


// routes **********************


videos.route('/')
    .get(function(req,res,next) {
        console.log('############################ NEW GET REQUEST WITHOUT ID ##############################');
        var verify = undefined;
        var err = undefined;
        VideoModel.find({}, function(err, items) {
            videos = items;
                      });
        if(videos == undefined){
            res.status(204).end();
        } else {
            if(req.query != undefined) {
                console.log("QUERY LENGTH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(Object.keys(req.query).length);
                console.log("QUERY LENGTH _______________________________");
                verify = checkQuery(req.query);
                if(verify.filter === 'bad' || verify.limit === -1 || verify.offset === -1 || verify.checkAttributes === false){
                    err = new Error('At least one Query Attribute has an illegal value');
                    err.status = 400;
                    next(err);
                }else{
                    console.log("calling filter");
                    var result = filter.filterQueryFunc(verify, videos);
                    console.log('################################## END OF GET #####################################');
                    console.log('');
                    if(result.emptyCheck == true){
                        err = new Error('No video with given parameters found');
                        err.status = 404;
                        next(err);
                    }else {
                        res.status(200).json(result.videos);
                    }
                }
            }else{
                res.status(200).json(videos);
            }
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
        } else {
            req.body.timestamp = Date.now();
            var video = new VideoModel(req.body);
            video.save(function(err) {
               if(!err){
                   res.status(201).json(video);
               } else {
                   next(err);
               }
            });
        }
    });


videos.route('/:id')
    .get(function(req, res, next) {
        console.log('############################ NEW GET REQUEST WITH ID ##############################');
        var videos = VideoModel.find({}, function(err, items) {
            res.json(items);
        });
        var verify = undefined;
        var err = undefined;
        if(videos == undefined){
            err = new Error('There is no Video with this id');
            err.status = 404;
            next(err);
        }else {
            if(req.query.filter != undefined) {
                verify = checkQuery(req.query);
                if(verify.filter === 'bad' || verify.limit === -1 || verify.offset === -1){
                    err = new Error('At least one Query Attribute has an illegal value');
                    err.status = 400;
                    next(err);
                }else{
                    console.log("calling filter");
                    var result = filter.filterQueryFunc(verify, videos);
                    console.log('################################## END OF GET #####################################');
                    console.log('');
                    res.status(200).json(result.videos[0]);
                }
            }else{
                res.status(200).json(videos);
            }

        }
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
            VideoModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, item){
                if(!err) {
                   res.status(201).json(item);
                } else {
                    next(err);
                }
            });
        } else {
            err = new Error('The URL-ID doesn\'t match the ID given in the Body!');
            err.status = 400;
            next(err);
        }
    })

    .delete(function(req, res, next) {
        var videos = VideoModel.find({}, function(err, items) {
            res.json(items);
        });
        var err = undefined;
        if(videos == undefined){
            err = new Error('There is no Video with the ID:' + req.params.id);
            err.status = 404;
            next(err);
        }else{
            VideoModel.findByIdAndRemove(req.params.id, function(err,item){
                if(!err){
                    res.setHeader('Content-Type', 'application/json');
                    res.status(204).end();
                } else {
                    next(err);
                }
            });
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

/**
 * This function checks, if the queryparameters filter, limit and offset have legal values
 * @param query
 * @returns {{filter: (*|Array|filterFunc|string|NodeFilter), limit: (*|number|Number), offset: (*|number)}}
 *          returns an array with legal (or default/break) values for the filter function
 */
function checkQuery(query){
    console.log('--------Query Check-------');
    var checkedQuery = {
        filter : undefined,
        limit : query.limit,
        offset : query.offset,
        queryChecksum : Object.keys(query).length,
        numberOfSpecialQuerys : 0,  // like offset, limit, filter
        // keywords we need in filter class to search
        keywords : {
            id : undefined,
            title : undefined,
            description : undefined,
            src : undefined,
            length : undefined,
            timestamp : undefined,
            playcount : undefined,
            ranking : undefined
        }
    };

    /**
     * Checks if the filter values are legal
     */
    if(query.filter != undefined){
        var filterArray = query.filter.split(',');
        var dummyString = undefined;
        checkedQuery.numberOfSpecialQuerys += 1;
        for(var i = 0; i < filterArray.length; i++){
            if(!(filterArray[i] === 'id' || filterArray[i] === 'title' || filterArray[i] === 'description' ||filterArray[i] === 'src' || filterArray[i] === 'length' || filterArray[i] === 'timestamt' || filterArray[i] === 'playcount' || filterArray[i] === 'ranking')){
                checkedQuery.filter = 'bad';
                break;
            }else{
                checkedQuery.filter = filterArray;
            }
        }

    }


    /**
     * Checks if the limit values are legal
     */
    if(query.limit != undefined){
        checkedQuery.numberOfSpecialQuerys += 1;

        checkedQuery.limit = parseInt(query.limit);
        if(checkedQuery.limit !== checkedQuery.limit || checkedQuery.limit <= 0){
            checkedQuery.limit = -1;
        }
    }else {
        console.log('default limit is set');
        checkedQuery.limit = 25;
    }
    
    if(query.offset != undefined){
        checkedQuery.numberOfSpecialQuerys += 1;

        checkedQuery.offset = parseInt(query.offset);
        if(checkedQuery.offset !== checkedQuery.offset || checkedQuery.offset < 0 || checkedQuery.offset >= videos.length){
            checkedQuery.offset = -1;
        }
    }else{
        console.log('default offset is set');
        checkedQuery.offset = 0;
    }


    /**
     * Checks if there are any GET Attributes in the query
     * if true then write them to the attributes array
     */

    if(query.id != undefined){
        checkedQuery.keywords.id = query.id;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.title != undefined){
        checkedQuery.keywords.title = query.title;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.description != undefined){
        checkedQuery.keywords.description = query.description;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.src != undefined){
        checkedQuery.keywords.src = query.src;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.length != undefined){
        checkedQuery.keywords.length = query.length;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.timestamp != undefined){
        checkedQuery.keywords.timestamp = query.timestamp;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.playcount != undefined){
        checkedQuery.keywords.playcount = query.playcount;
        checkedQuery.queryChecksum -= 1;
    }
    if(query.ranking != undefined){
        checkedQuery.keywords.ranking = query.ranking;
        checkedQuery.queryChecksum -= 1;
    }

    /* Check if there are any non allowed attributes
     * There are only 8 possible video Parameters and 3 extra Parameters (filter,offset,limit)
     *
     */
    if( (checkedQuery.queryChecksum - checkedQuery.numberOfSpecialQuerys) > 0 ){
        checkedQuery.checkAttributes = false;
        console.log("Ungültige Parameter im Query!");
        console.log((checkedQuery.numberOfSpecialQuerys));
        console.log((checkedQuery.queryChecksum-checkedQuery.numberOfSpecialQuerys));
        console.log("___________________________________");

        // Need this for the case that there are keywords but no filter
        checkedQuery.filter = undefined;
    }


    console.log('filter value:');
    console.log(checkedQuery.filter);
    console.log('limit is: ' + checkedQuery.limit);
    console.log('offset is: ' + checkedQuery.offset);
    console.log('query obj: ');
    console.log(checkedQuery);
    console.log('------Query Check done-----');
    console.log('');

    return checkedQuery;
}

module.exports = videos;
